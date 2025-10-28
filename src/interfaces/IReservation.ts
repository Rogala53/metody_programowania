import type { IPassenger } from "./IPassenger.ts";
import type { ReservationStatus } from "../types/ReservationStatus.ts"
export interface IReservation {
    id: number;
    userId: number;
    flightId: number;
    passengers: IPassenger[];
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}