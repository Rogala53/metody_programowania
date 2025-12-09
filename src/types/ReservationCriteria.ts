import type {IPassenger} from "../interfaces/IPassenger";
import type {ReservationStatus} from "./ReservationStatus";
import type {IUser} from "../interfaces/IUser";
import type {ITicket} from "../interfaces/ITicket";
import type {TicketClass} from "./TicketClass";

export type ReservationCriteria = {
    id: number;
    flightId: number;
    paymentId: number;
    user: IUser;
    passengers: IPassenger[];
    tickets: ITicket[];
    ticketsClass: TicketClass;
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}