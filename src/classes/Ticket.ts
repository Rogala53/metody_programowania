import type { TicketClass } from "../types/TicketClass"
import type { ITicket } from "../interfaces/ITicket"
import type { IPassenger } from "../interfaces/IPassenger";
import type {TicketCriteria} from "../types/TicketCriteria.ts";

export class Ticket implements ITicket {
    public id: number;
    public userId: number;
    public reservationId: number;
    public passenger: IPassenger;
    public seatNumber: string;
    public ticketClass: TicketClass
    constructor(ticketCriteria: TicketCriteria) {
        this.id = ticketCriteria.id;
        this.userId = ticketCriteria.userId;
        this.reservationId = ticketCriteria.reservationId;
        this.passenger = ticketCriteria.passenger;
        this.seatNumber = ticketCriteria.seatNumber;
        this.ticketClass = ticketCriteria.ticketClass;
    }



}