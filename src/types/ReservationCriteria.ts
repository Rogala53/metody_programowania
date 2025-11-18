import {IPassenger} from "../interfaces/IPassenger"
import {ReservationStatus} from "./ReservationStatus";
import {IUser} from "../interfaces/IUser";
import {ITicket} from "../interfaces/ITicket";

export type ReservationCriteria = {
    id: number;
    flightId: number;
    paymentId: number;
    user: IUser;
    passengers: IPassenger[];
    tickets: ITicket[];
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}