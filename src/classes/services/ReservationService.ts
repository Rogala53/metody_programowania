import type {ReservationCriteria} from "../../types/ReservationCriteria.ts";
import type { IReservation } from "../../interfaces/IReservation.ts";
import {Reservation} from "../Reservation.ts";
import type {ITicketService} from "../../interfaces/ITicketService.ts";
import type {IPaymentService} from "../../interfaces/IPaymentService.ts";
import type {IReservationDbService} from "../../interfaces/IReservationDbService.ts";
import type {IFlightService} from "../../interfaces/IFlightService.ts";

export class ReservationService {
    private db: IReservationDbService;
    private ticketService: ITicketService;
    private paymentService: IPaymentService;
    private flightService: IFlightService;

    constructor(db: IReservationDbService,
                ticketService: ITicketService,
                paymentService: IPaymentService,
                flightService: IFlightService) {
        this.db = db;
        this.ticketService = ticketService;
        this.paymentService = paymentService;
        this.flightService = flightService;
    }

   async createReservation(criteria: ReservationCriteria): Promise<boolean> {
        try {
            const flight = await this.flightService.getFlightDetails(criteria.flightId);
            if(!flight) {
                throw new Error("Wybrany lot nie istnieje.");
            }

            const totalPrice = flight.price * criteria.passengers.length;

            const reservationData: ReservationCriteria = {
                id: criteria.id,
                user: criteria.user,
                flightId: flight.id,
                paymentId: criteria.paymentId,
                passengers: criteria.passengers,
                tickets: criteria.tickets,
                ticketsClass: criteria.ticketsClass,
                status: "confirmed",
                totalPrice: totalPrice,
                createdAt: new Date()
            };
            const newReservation = new Reservation(reservationData);


            const paymentSuccess = await this.paymentService.payForReservation(newReservation ,totalPrice);

            if(!paymentSuccess) {
                throw new Error("Płatność nie powiodła się.");
            }

            await this.flightService.updateAvailableSeats(flight.id, criteria.passengers.length);



            const addingSuccess = await this.db.addReservation(newReservation);

            const sendingSuccess = await this.ticketService.generateAndSendTickets(newReservation);

            return addingSuccess && sendingSuccess;
        } catch (error) {
            console.error("Błąd podczas tworzenia rezerwacji");
            return false;
        }
   }
   async editReservation(reservation: IReservation): Promise<boolean> {
        //Logika edycji (np. zmiana pasażerów)
        console.log(`Edytowanie rezerwacji ${reservation.id}`);
        return this.db.updateReservation(reservation);
   }
    async cancelReservation(reservation: IReservation): Promise<boolean> {
        //Logika anulowania

        //1.Usunięcie rezerwacji z bazy danych
        await this.db.removeReservation(reservation);

        //2.Zlecenie wykonania zwrotu pieniędzy
        const payment = await this.paymentService.findPayment(reservation.paymentId);
        if(!payment) {
            console.error("Błąd nie znaleziono platności powiązanej z tą rezerwacją");
            return false;
        }

        const refundSuccess: boolean = await this.paymentService.refundPayment(payment);


        if(!refundSuccess) {
            console.error("Błąd zwrot środków nie powiódł się");
            return false;
        }

        //3.Zwolnienie miejsca
        const flightId: number = reservation.flightId;
        const seatsToFreeUp: number = -(reservation.passengers.length);
        await this.flightService.updateAvailableSeats(flightId, seatsToFreeUp);


        console.log(`Pomyślnie anulowano rezerwację ${reservation.id}`);
        return true;
    }

}