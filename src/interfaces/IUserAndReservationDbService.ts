import type { IReservation } from "./IReservation";


export interface IUserAndReservationDbService {
    addReservation(reservation: IReservation): Promise<boolean>;
    removeReservation(reservation: IReservation): Promise<boolean>;
}