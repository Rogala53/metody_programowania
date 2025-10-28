import type {IPassenger} from "./IPassenger.ts";
import type {TicketClass} from "../types/TicketClass.ts"
export interface ITicket {
    id: number;
    reservationId: number;
    passenger: IPassenger;
    seatNumber: string;
    ticketClass: TicketClass;
}
