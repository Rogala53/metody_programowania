import type { IPassenger } from "./IPassenger.ts";
import type { ReservationStatus } from "../types/ReservationStatus.ts"
import type { IUser } from "./IUser.ts";
export interface IReservation {
    id: number;
    user: IUser;
    flightId: number;
    paymentId: number;
    passengers: IPassenger[];
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}