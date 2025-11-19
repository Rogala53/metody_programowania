import type {IReservation} from "./IReservation.ts";

export interface IReservationDbService {
    addReservation(reservation: IReservation): Promise<boolean>;
    updateReservation(reservation: IReservation): Promise<boolean>;
    removeReservation(reservation: IReservation): Promise<boolean>;
}