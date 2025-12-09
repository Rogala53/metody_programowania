import type {IUser} from "../interfaces/IUser.ts";
import type {IPassenger} from "../interfaces/IPassenger.ts";
import type {ITicket} from "../interfaces/ITicket.ts";
import type {TicketClass} from "../types/TicketClass.ts";
import type {ReservationStatus} from "../types/ReservationStatus.ts";
import {Reservation} from "./Reservation.ts";
import type {ReservationCriteria} from "../types/ReservationCriteria.ts";
import {DomainError} from "../exceptions/DomainError.ts";

export class ReservationBuilder {
    private id: number = 0;
    private flightId: number = 0;
    private paymentId: number = 0;
    private user: IUser | null = null;
    private passengers: IPassenger[] = [];
    private tickets: ITicket[] = [];
    private ticketsClass: TicketClass = 'economic';
    private status: ReservationStatus = 'pending';
    private totalPrice: number = 0;
    private createdAt: Date = new Date();

    setId(id: number): ReservationBuilder {
        this.id = id;
        return this;
    }
    setFlightId(flightId: number) {
        this.flightId = flightId;
        return this;
    }
    setPaymentId(paymentId: number) {
        this.paymentId = paymentId;
        return this;
    }
    setUser(user: IUser): ReservationBuilder {
        this.user = user;
        return this;
    }

    setPassengers(passengers: IPassenger[]): ReservationBuilder {
        this.passengers = passengers;
        return this;
    }

    addPassenger(passenger: IPassenger): ReservationBuilder {
        this.passengers.push(passenger);
        return this;
    }

    setTickets(tickets: ITicket[]): ReservationBuilder {
        this.tickets = tickets;
        return this;
    }

    setTicketsClass(ticketsClass: TicketClass): ReservationBuilder {
        this.ticketsClass = ticketsClass;
        return this;
    }

    setStatus(status: ReservationStatus): ReservationBuilder {
        this.status = status;
        return this;
    }

    setTotalPrice(totalPrice: number): ReservationBuilder {
        this.totalPrice = totalPrice;
        return this;
    }

    setCreatedAt(createdAt: Date): ReservationBuilder {
        this.createdAt = createdAt;
        return this;
    }

    build(): Reservation {
        if (!this.user) {
            throw new DomainError("Rezerwacja musi mieć przypisanego użytkownika!");
        }

        const criteria: ReservationCriteria = {
            id: this.id,
            flightId: this.flightId,
            paymentId: this.paymentId,
            user: this.user,
            passengers: this.passengers,
            tickets: this.tickets,
            ticketsClass: this.ticketsClass,
            status: this.status,
            totalPrice: this.totalPrice,
            createdAt: this.createdAt
        };

        return new Reservation(criteria);
    }
}