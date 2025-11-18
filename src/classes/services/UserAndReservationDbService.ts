import {DbService} from "./DbService.ts";
import {User} from "../User.ts"
import {Reservation} from "../Reservation.ts";

export class UserAndReservationDbService extends DbService {
    private usersTable: User[] = [];
    private reservationsTable: Reservation[] = [];
    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }
    async addUserInDb(user: User): Promise<boolean> {
        if(this.usersTable.some(u => u.email === user.email)) {
            return false;
        }
        this.usersTable.push(user);
        console.log(`db: dodanie użytkownika ${user.email}`);
        return true;
    }

    async removeUserInDb(user: User): Promise<boolean> {
        const index = this.usersTable.findIndex(u => u.id === user.id);
        if(index > -1) {
            this.usersTable.splice(index, 1);
            return true;
        }
        return false;
    }

    findUserByEmailInDb(email: string): User | null {
        const user = this.usersTable.find(u => u.email === email);
        if(!user) {
            console.error("Użytkownik nie istnieje");
            return null;
        }
        return user;
    }

    async addReservationInDb(user: User, reservation: Reservation): Promise<boolean> {
        console.log(`db: zapisywanie rezerwacji ${reservation.id} dla użytkownika ${user.username}`);
        this.reservationsTable.push(reservation);
        return true;
    }
    async removeReservationInDb(reservation: Reservation): Promise<boolean> {
        const index = this.reservationsTable.findIndex(u => u.id === reservation.id);
        if(index > -1) {
            this.reservationsTable.splice(index, 1);
            console.log(`db: usuwanie rezerwacji ${index}`);
            return true;
        }
        return false;
    }
    async updateReservationInDb(reservation: Reservation): Promise<boolean> {
        const index = this.reservationsTable.findIndex(r => r.id === reservation.id);
        if(index > -1) {
            this.reservationsTable[index] = reservation;
            return true;
        }
        return false;
    }

}