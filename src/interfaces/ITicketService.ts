import type {IReservation} from "./IReservation.ts";
import type {IUser} from "./IUser.ts";

export interface ITicketService {
    generateAndSendTickets(reservation: IReservation, user: IUser): Promise<boolean>;
}