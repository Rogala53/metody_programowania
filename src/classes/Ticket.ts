import type { TicketClass } from "../types/TicketClass"
import type { ITicket } from "../interfaces/ITicket"
import type {Passenger} from "./Passenger.ts";

export class Ticket implements ITicket {
    public id: number;
    public reservationId: number;
    public passenger: Passenger;
    public seatNumber: string;
    public ticketClass: TicketClass
    constructor(id: number, reservationId: number, passenger: Passenger, seatNumber: string, ticketClass: TicketClass) {
        this.id = id;
        this.reservationId = reservationId;
        this.passenger = passenger;
        this.seatNumber = seatNumber;
        this.ticketClass = ticketClass;
    }



}