import type {IReservation} from "./IReservation.ts";

export interface IReservationDbService {
    addReservation(reservation: IReservation): Promise<void>;
    updateReservation(reservationId: number, reservation: IReservation): Promise<void>;
    deleteReservation(reservation: IReservation): Promise<void>;
}