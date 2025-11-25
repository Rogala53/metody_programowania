import type {IUserDbService} from "../../interfaces/IUserDbService.ts";
import {DbService} from "./DbService.ts";
import type {IUser} from "../../interfaces/IUser.ts";
import {Logger} from "../Logger.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";
import {DomainError} from "../../exceptions/DomainError.ts";


export class UserDbService extends DbService implements IUserDbService {
    private users: IUser[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }


    async addUser(user: IUser): Promise<void> {
        Logger.info(`Rozpoczęcie dodawania użytkownika do bazy danych`);

        if(this.users.some(u => u.email === user.email)) {
            throw new DomainError(`Uzytkownik o mailu ${user.email} juz istnieje`);
        }

        try {
            this.users.push(user);
            Logger.info(`Pomyślnie dodano użytkownika ${user.id} (${user.email})`);

        } catch (error) {
            Logger.error(`Błąd zapisu użytkownika ${user.email}`, error);
            throw new InfrastructureError(`Krytyczny błąd podczas zapisywania użytkownika ${user.email} w bazie danych`, error);
        }
    }

    async removeUser(userId: number): Promise<void> {
        Logger.info(`DB: Usuwanie użytkownika ${userId}`);
        const index = this.users.findIndex(u => u.id == userId);

        if(index === -1) {
            throw new DomainError(`Użytkownik o numerze id ${userId} nie istnieje`);
        }
        try {
            this.users.splice(index, 1);
            Logger.info(`DB: Usunięto użytkownika ${userId}`);
        } catch (error) {
            throw new InfrastructureError(`Wystąpił nieoczekiwany błąd podczas usuwania użytkownika ${userId} z bazy danych`, error);
        }
    }

    async updateUser(userId: number, newUser: IUser): Promise<void> {
        Logger.info(`DB: Aktualizacja danych użytkownika w bazie danych`);

        try {
            const index = this.users.findIndex(u => u.id == userId);
            if(index === -1) {
                throw new DomainError(`Użytkownik o numerze id ${userId} nie istnieje`);
            }

            this.users[index] = newUser;

            Logger.info(`Dane użytkownika ${userId} zaktualizowane pomyślnie`);

        } catch (error) {
            if(error instanceof DomainError) throw error;

            throw new InfrastructureError("DB: Wystąpił nieoczekiwany błąd podczas aktualizacji danych użytkownika", error);
        }
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        try {
            const user = this.users.find(u => u.email === email);
            return user || null
        } catch (error) {
            throw new InfrastructureError(`Błąd odczytu bazy danych przy wyszukiwaniu maila ${email}`, error);
        }
    }


}