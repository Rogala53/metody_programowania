import {Passenger} from "../classes/Passenger"
import {TicketClass} from "./TicketClass";

export type TicketCriteria = {
    id: number;
    reservationId: string;
    passenger: Passenger;
    seatNumber: string;
    ticketClass: TicketClass;
}