import type { IReservation } from "../interfaces/IReservation"
import type { IPassenger } from "./IPassenger.ts";
import type { ReservationStatus } from "../types/ReservationStatus.ts"
import { Passenger } from "./Passenger.ts"
class Reservation implements IReservation {
    public id: number;
    public userId: number;
    public flightId: number;
    public passengers: IPassenger[];
    public status: ReservationStatus;
    public totalPrice: number;
    public createdAt: Date;

    constructor(id: number, userId: number, flightId: number, passengers: Passenger[], status: ReservationStatus, totalPrice: number, createdAt: Date) {
        this.id = id;
        this.userId = userId;
        this.flightId = flightId;
        this.passengers = passengers;
        this.status = status;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
    }


}