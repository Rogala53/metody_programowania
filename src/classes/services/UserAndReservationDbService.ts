import {DbService} from "./DbService.ts";
import {User} from "../User.ts"
import {Reservation} from "../Reservation.ts";
import type {IUserAndReservationDbService} from "../../interfaces/IUserAndReservationDbService.ts";

export class UserAndReservationDbService extends DbService implements IUserAndReservationDbService {
    private usersTable: User[] = [];
    private reservationsTable: Reservation[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }



    async addReservation(reservation: Reservation): Promise<boolean> {
        console.log(`db: zapisywanie rezerwacji ${reservation.id} dla użytkownika ${reservation.user.username}`);
        this.reservationsTable.push(reservation);
        return true;
    }

    async removeReservation(reservation: Reservation): Promise<boolean> {
        const index = this.reservationsTable.findIndex(r => r.id === reservation.id);
        if(index > -1) {
            this.reservationsTable.splice(index, 1);
            console.log(`db: usuwanie rezerwacji ${index}`);
            return true;
        }
        return false;
    }

    async updateReservation(reservation: Reservation): Promise<boolean> {
        const index = this.reservationsTable.findIndex(r => r.id === reservation.id);
        if(index > -1) {
            this.reservationsTable[index] = reservation;
            return true;
        }
        return false;
    }



    async addUser(user: User): Promise<boolean> {
        if(this.usersTable.some(u => u.email === user.email)) {
            console.error("Uzytkownik o takim mailu juz istnieje");
            return false;
        }
        this.usersTable.push(user);
        console.log(`db: dodanie użytkownika ${user.email}`);
        return true;
    }

    async removeUser(user: User): Promise<boolean> {
        const index = this.usersTable.findIndex(u => u.id === user.id);
        if(index > -1) {
            this.usersTable.splice(index, 1);
            return true;
        }
        return false;
    }


    async findUserByEmail(email: string): Promise<User | null> {
        const user = this.usersTable.find(u => u.email === email);
        if(!user) {
            console.error("Użytkownik nie istnieje");
            return null;
        }
        return user;
    }
}