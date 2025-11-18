import {IPassenger} from "../interfaces/IPassenger"
import {TicketClass} from "./TicketClass";

export type TicketCriteria = {
    id: number;
    userId: number;
    reservationId: number;
    passenger: IPassenger;
    seatNumber: string;
    ticketClass: TicketClass;
}