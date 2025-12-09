import type {ReservationCriteria} from "../../types/ReservationCriteria.ts";
import type { IReservation } from "../../interfaces/IReservation.ts";
import {ReservationBuilder} from "../ReservationBuilder.ts";
import type {ITicketService} from "../../interfaces/ITicketService.ts";
import type {IPaymentService} from "../../interfaces/IPaymentService.ts";
import type {IReservationDbService} from "../../interfaces/IReservationDbService.ts";
import type {IFlightService} from "../../interfaces/IFlightService.ts";
import {ValidationError} from "../../exceptions/ValidationError.ts";
import {Logger} from "../Logger.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";
import {DomainError} from "../../exceptions/DomainError.ts";
import {Payment} from "../Payment.ts";
import {Validator} from "../Validator.ts";

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

   async createReservation(criteria: ReservationCriteria): Promise<void> {
        Logger.info(`Tworzenie rezerwacji dla lotu: ${criteria.flightId}`);
        try {
            Validator.validatePositiveNumber(criteria.passengers.length, "Lista pasażerów");

            const flight = await this.flightService.getFlightDetails(criteria.flightId);
            if(!flight) {
                throw new DomainError("Wybrany lot nie istnieje.");
            }

            const totalPrice = flight.price * criteria.passengers.length;

            const newReservation = new ReservationBuilder()
                .setId(criteria.id)
                .setUser(criteria.user)
                .setFlightId(criteria.flightId)
                .setPaymentId(criteria.paymentId)
                .setPassengers(criteria.passengers)
                .setTickets(criteria.tickets)
                .setTicketsClass(criteria.ticketsClass)
                .setStatus("confirmed")
                .setTotalPrice(criteria.totalPrice)
                .setCreatedAt(new Date())
                .build();


            try {
                await this.paymentService.payForReservation(newReservation ,totalPrice);
            } catch(error) {
                throw error;
            }

            try {
                await this.flightService.updateAvailableSeats(flight.id, criteria.passengers.length);
            } catch(error) {
                Logger.warn(`Błąd zajmowania miejsc. Wycofywanie płatności dla rezerwacji ${newReservation.id}`);
                await this.paymentService.refundPayment(
                    new Payment(newReservation.id, newReservation.user.id, newReservation.flightId, "accepted")
                );

                throw new InfrastructureError("Błąd zapisu rezerwacji. Środki zostały zwrócone", error as Error)
            }
            try {
                await this.db.addReservation(newReservation);
            } catch(error) {
                Logger.error(`Krytyczny błąd zapisu DB. Rollback transakcji ${newReservation.id}`);

                await this.flightService.updateAvailableSeats(flight.id, -criteria.passengers.length);

                await this.paymentService.refundPayment(
                    new Payment(newReservation.id, newReservation.user.id, newReservation.flightId, "accepted")
                );

                throw new InfrastructureError(`Błąd zapisu rezerwacji ${newReservation.id}. Środki zostały zwrócone.`);
            }

            Logger.info(`Rezerwacja ${newReservation.id} zakończona sukcesem.`);

            try {
                await this.ticketService.generateAndSendTickets(newReservation);

            } catch(error) {
                Logger.error(`Rezerwacja udana, ale błąd wysyłki biletów dla ${newReservation.id}`);
            }

        } catch (error) {
            if (error instanceof DomainError ||
                error instanceof ValidationError ||
                error instanceof InfrastructureError) {
                    throw error;
            }

            throw new InfrastructureError("Nieoczekiwany błąd podczas tworzenia rezerwacji", error as Error);
        }
   }

   async editReservation(reservation: IReservation): Promise<void> {
        Logger.info(`Rozpoczęcie edycji rezerwacji ${reservation.id}`);
        //Logika edycji (np. zmiana pasażerów)
        try {
            if(!reservation.passengers || reservation.passengers.length === 0) {
                throw new DomainError("Rezerwacja musi zawierać co najmniej jednego pasażera");
            }

            if(reservation.status === "cancelled" || reservation.status === "rejected") {
                throw new DomainError(`Nie można edytować rezerwacji o statusie ${reservation.id}`);
            }
            await this.db.updateReservation(reservation.id, reservation);

            Logger.info(`Pomyślnie zaktualizowano rezerwację ${reservation.id}`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Nieoczekiwany błąd podczas edycji rezerwacji ${reservation.id}`, error as Error);
        }

   }
    async cancelReservation(reservation: IReservation): Promise<void> {
        Logger.info(`Rozpoczęcie anulowania rezerwacji ${reservation.id}`);
        //Logika anulowania

        if(reservation.status === "cancelled") {
            throw new DomainError(`Rezerwacja ${reservation.id} jest już anulowana`);
        }

        try {

            const payment = await this.paymentService.findPayment(reservation.paymentId);
            await this.paymentService.refundPayment(payment);



            try {
                const seatsToFreeUp: number = -(reservation.passengers.length);
                await this.flightService.updateAvailableSeats(reservation.flightId, seatsToFreeUp);
            } catch(error) {
                Logger.error(`Zwrot wykonany, ale nie udało się zwolnić miejsc dla lotu ${reservation.flightId}`, error as Error);
            }

            await this.db.deleteReservation(reservation);


            Logger.info(`Pomyślnie anulowano rezerwację ${reservation.id}`);
        }
        catch(error) {
            if(error instanceof DomainError || error instanceof InfrastructureError) throw error;

            throw new InfrastructureError(`Wystąpił nieoczekiwany błąd podczas anulowania rezerwacji`, error as Error);
        }

    }

}