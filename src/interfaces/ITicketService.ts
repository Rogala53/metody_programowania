import type {IReservation} from "./IReservation.ts";

export interface ITicketService {
    generateAndSendTickets(reservation: IReservation): Promise<void>;
}