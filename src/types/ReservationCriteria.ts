import {Passenger} from "../classes/Passenger"
import {ReservationStatus} from "./ReservationStatus";

export type ReservationCriteria = {
    userId: string;
    flightId: string;
    passengers: Passenger[];
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}