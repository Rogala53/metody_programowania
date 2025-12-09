import type {IPassenger} from "../interfaces/IPassenger.ts";
import type {TicketClass} from "../types/TicketClass.ts";
import {Ticket} from "./Ticket.ts";
import type {TicketCriteria} from "../types/TicketCriteria.ts";
import {DomainError} from "../exceptions/DomainError.ts";

export class TicketBuilder {
    private id: number = 0;
    private userId: number = 0;
    private reservationId: number = 0;
    private passenger: IPassenger | null = null;
    private seatNumber: string = "";
    private ticketClass: TicketClass = 'economic'

    setId(id: number): TicketBuilder {
        this.id = id;
        return this;
    }

    setUserId(userId: number): TicketBuilder {
        this.userId = userId;
        return this;
    }

    setReservationId(reservationId: number): TicketBuilder {
        this.reservationId = reservationId;
        return this;
    }

    setPassenger(passenger: IPassenger): TicketBuilder {
        this.passenger = passenger;
        return this;
    }

    setSeatNumber(seatNumber: string): TicketBuilder {
        this.seatNumber = seatNumber;
        return this;
    }

    setTicketClass(ticketClass: TicketClass) {
        this.ticketClass = ticketClass;
        return this;
    }


    build(): Ticket {
        if(!this.passenger) {
            throw new DomainError("Bilet musi mieć przypisanego pasażera");
        }

        const ticketCriteria: TicketCriteria = {
            id: this.id,
            userId: this.userId,
            reservationId: this.reservationId,
            passenger: this.passenger,
            seatNumber: this.seatNumber,
            ticketClass: this.ticketClass
        };

        return new Ticket(ticketCriteria);


    }
}