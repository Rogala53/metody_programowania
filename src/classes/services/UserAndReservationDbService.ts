import {DbService} from "./DbService.ts";
import {User} from "../User.ts"
import {Reservation} from "../Reservation.ts";

export class UserAndReservationDbService extends DbService {
    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }
    async addUserInDb(user: User): Promise<boolean>;
    async removeUserInDb(user: User): Promise<boolean>;
    async addReservationInDb(user: User, reservation: Reservation): Promise<boolean>;
    async removeReservationInDb(reservation: Reservation): Promise<boolean>;
    async updateReservationInDb(reservation: Reservation): Promise<boolean>;
    findUserByEmailInDb(email: string): User | null;
}