import {IPassenger} from "../interfaces/IPassenger"
import {ReservationStatus} from "./ReservationStatus";
import {IUser} from "../interfaces/IUser";

export type ReservationCriteria = {
    id: number;
    flightId: number;
    paymentId: number;
    user: IUser;
    passengers: IPassenger[];
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}