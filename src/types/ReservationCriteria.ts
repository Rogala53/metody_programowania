import {IPassenger} from "../interfaces/IPassenger"
import {ReservationStatus} from "./ReservationStatus";
import {IUser} from "../interfaces/IUser";
import {ITicket} from "../interfaces/ITicket";
import {TicketClass} from "./TicketClass";

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