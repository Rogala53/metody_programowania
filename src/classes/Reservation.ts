import type { IReservation } from "../interfaces/IReservation"
import type { IPassenger } from "../interfaces/IPassenger.ts";
import type { ReservationStatus } from "../types/ReservationStatus.ts"
import type {ReservationCriteria} from "../types/ReservationCriteria.ts";
import type {IUser} from "../interfaces/IUser.ts";
export class Reservation implements IReservation {
    public id: number;
    public user: IUser;
    public flightId: number;
    public paymentId: number;
    public passengers: IPassenger[];
    public status: ReservationStatus;
    public totalPrice: number;
    public createdAt: Date;

    constructor(data: ReservationCriteria) {
        this.id = data.id;
        this.user = data.user;
        this.flightId = data.flightId;
        this.paymentId = data.paymentId;
        this.passengers = data.passengers;
        this.status = data.status;
        this.totalPrice = data.totalPrice;
        this.createdAt = data.createdAt;
    }


}