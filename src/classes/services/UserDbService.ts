import type {IUserDbService} from "../../interfaces/IUserDbService.ts";
import {DbService} from "./DbService.ts";
import type {IUser} from "../../interfaces/IUser.ts";
import {Logger} from "../Logger.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";
import {DomainError} from "../../exceptions/DomainError.ts";
import {CrudRepository} from "../CrudRepository.ts";


export class UserDbService extends CrudRepository<IUser> implements IUserDbService {

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }


    async addUser(user: IUser): Promise<void> {
        Logger.info(`Rozpoczęcie dodawania użytkownika do bazy danych`);

        try {
            await this.add(user);
            Logger.info(`Pomyślnie dodano użytkownika ${user.id} (${user.email})`);

        } catch (error) {
            Logger.error(`Błąd zapisu użytkownika ${user.email}`, error);
            throw new InfrastructureError(`Krytyczny błąd podczas zapisywania użytkownika ${user.email} w bazie danych`, error as Error);
        }
    }

    async deleteUser(userId: number): Promise<void> {
        Logger.info(`DB: Usuwanie użytkownika ${userId}`);
        try {
            await this.delete(userId);
            Logger.info(`DB: Usunięto użytkownika ${userId}`);
        } catch (error) {
            throw new InfrastructureError(`Wystąpił nieoczekiwany błąd podczas usuwania użytkownika ${userId} z bazy danych`, error as Error);
        }
    }

    async updateUser(userId: number, newUser: IUser): Promise<void> {
        Logger.info(`DB: Aktualizacja danych użytkownika w bazie danych`);

        try {
            await this.update(userId, newUser);
            Logger.info(`Dane użytkownika ${userId} zaktualizowane pomyślnie`);

        } catch (error) {
            if(error instanceof DomainError) throw error;

            throw new InfrastructureError("DB: Wystąpił nieoczekiwany błąd podczas aktualizacji danych użytkownika", error as Error);
        }
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        try {
            const user = this.items.find(u => u.email === email);
            return user || null
        } catch (error) {
            throw new InfrastructureError(`Błąd odczytu bazy danych przy wyszukiwaniu maila ${email}`, error as Error);
        }
    }


}