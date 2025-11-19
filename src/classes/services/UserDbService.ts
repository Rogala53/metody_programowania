import type {IUserDbService} from "../../interfaces/IUserDbService.ts";
import {DbService} from "./DbService.ts";
import type {IUser} from "../../interfaces/IUser.ts";


export class UserDbService extends DbService implements IUserDbService {
    private users: IUser[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }


    async addUser(user: IUser): Promise<boolean> {
        if(this.users.some(u => u.email === user.email)) {
            console.error("Uzytkownik o takim mailu juz istnieje");
            return false;
        }
        this.users.push(user);
        console.log(`db: dodanie użytkownika ${user.email}`);
        return true;
    }

    async removeUser(userId: number): Promise<boolean> {
        this.users.splice(userId, 1);
        return false;
    }


    async findUserByEmail(email: string): Promise<IUser | undefined> {
        const user = this.users.find(u => u.email === email);
        if(!user) {
            console.error("Użytkownik nie istnieje");
            return undefined;
        }
        return user;
    }
}