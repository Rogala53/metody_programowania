import type {IReservation} from "./IReservation.ts";

export interface IReservationDbService {
    addReservation(reservation: IReservation): Promise<void>;
    updateReservation(reservation: IReservation): Promise<void>;
    removeReservation(reservation: IReservation): Promise<void>;
}