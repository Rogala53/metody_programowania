import {DbService} from "./DbService.ts";
import {User} from "../User.ts"
import {Reservation} from "../Reservation.ts";

export class UserAndReservationDbService extends DbService {
    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }
    addUserInDb(user: User): boolean;
    removeUserInDb(user: User): boolean;
    addReservationInDb(user: User, reservation: Reservation): boolean;
    removeReservationInDb(reservation: Reservation): boolean;
    updateReservationInDb(reservation: Reservation): boolean;
    findUserByEmailInDb(email: string): User | null;
}