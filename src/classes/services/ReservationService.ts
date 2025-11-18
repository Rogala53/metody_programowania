import type {ReservationCriteria} from "../../types/ReservationCriteria.ts";
import type { IReservation } from "../../interfaces/IReservation.ts";
import {TicketService} from "./TicketService.ts";
import {PaymentService} from "./PaymentService.ts";
import {SearchFlightService} from "./SearchFlightService.ts";
import type {UserAndReservationDbService} from "./UserAndReservationDbService.ts";
import {Reservation} from "../Reservation.ts";
class ReservationService {
    private db: UserAndReservationDbService;
    private ticketService: TicketService;
    private paymentService: PaymentService;
    private flightService: SearchFlightService;

    constructor(db: UserAndReservationDbService,
                ticketService: TicketService,
                paymentService: PaymentService,
                flightService: SearchFlightService) {
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

            const paymentSuccess = await this.paymentService.payForReservation(totalPrice, criteria.user);

            if(!paymentSuccess) {
                throw new Error("Płatność nie powiodła się.");
            }

            await this.flightService.updateAvailableSeats(flight.id, criteria.passengers.length)

            const reservationData: ReservationCriteria = {
                id: Math.random(),
                user: criteria.user,
                flightId: flight.id,
                paymentId: criteria.flightId,
                passengers: criteria.passengers,
                tickets: criteria.tickets,
                status: "confirmed",
                totalPrice: totalPrice,
                createdAt: new Date()
            };
            const newReservation = new Reservation(reservationData);
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
        const payment = this.paymentService.payments.find(payment => payment.id === reservation.paymentId);
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