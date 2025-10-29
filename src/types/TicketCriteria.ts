import {Passenger} from "../classes/Passenger"
import {TicketClass} from "./TicketClass";

export type TicketCriteria = {
    reservationId: string;
    passenger: Passenger;
    seatNumber: string;
    ticketClass: TicketClass;
}