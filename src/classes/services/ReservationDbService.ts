import type {IReservationDbService} from "../../interfaces/IReservationDbService.ts";
import type {IReservation} from "../../interfaces/IReservation.ts";
import {DbService} from "./DbService.ts";

export class ReservationDbService extends DbService implements IReservationDbService {
    private reservations: IReservation[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }

    async addReservation(reservation: IReservation): Promise<boolean> {
        console.log(`db: zapisywanie rezerwacji ${reservation.id} dla użytkownika ${reservation.user.username}`);
        this.reservations.push(reservation);
        return true;
    }

    async removeReservation(reservation: IReservation): Promise<boolean> {
        const index = this.reservations.findIndex(r => r.id === reservation.id);
        if(index > -1) {
            this.reservations.splice(index, 1);
            console.log(`db: usuwanie rezerwacji ${index}`);
            return true;
        }
        return false;
    }

    async updateReservation(reservation: IReservation): Promise<boolean> {
        const index = this.reservations.findIndex(r => r.id === reservation.id);
        if(index > -1) {
            this.reservations[index] = reservation;
            return true;
        }
        return false;
    }
}