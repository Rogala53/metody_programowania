import type { IPassenger } from "./IPassenger.ts";
import type { ReservationStatus } from "../types/ReservationStatus.ts"
import type { IUser } from "./IUser.ts";
import type {ITicket} from "./ITicket.ts";
export interface IReservation {

    id: number;
    user: IUser;
    flightId: number;
    paymentId: number;
    passengers: IPassenger[];
    tickets: ITicket[];
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}