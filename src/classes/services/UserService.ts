import type {LoginCriteria} from "../../types/LoginCriteria.ts";
import type {UserCriteria} from "../../types/UserCriteria.ts";
import type {IUser} from "../../interfaces/IUser.ts";
import type {IUserDbService} from "../../interfaces/IUserDbService.ts";
import { Logger } from "../Logger.ts";
import {DomainError} from "../../exceptions/DomainError.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";
import type {IUserService} from "../../interfaces/IUserService.ts";

class UserService implements IUserService {
    private db: IUserDbService;
    constructor(db: IUserDbService) {
        this.db = db;
    }
    async logIn(credentials: LoginCriteria): Promise<IUser> {
        Logger.info(`Rozpoczęcie logowania na konto ${credentials.email}`);

        try {
            const user = await this.db.findUserByEmail(credentials.email);
            const isValidPassword = user && credentials.password === "password"; //symulacja
            if (!user || !isValidPassword) {
                throw new DomainError(`Błędny email lub hasło`);
            }

            Logger.info(`Użytkownik ${user.id} zalogowany pomyślnie`);
            return user;

        } catch (error) {
            if(error instanceof DomainError) throw error;

            throw new InfrastructureError("Wystąpił nieoczekiwany błąd podczas logowania", error);
        }
    }
    async createAccount(data: UserCriteria): Promise<void> {
        Logger.info(`Rozpoczęcie tworzenia nowego konta dla ${data.email}`);


        const hashedPassword = data.password // tu haslo powinno byc haszowane


        const newUser: IUser = {
            id: Math.floor(Math.random() * 10000),
            username: data.username,
            email: data.email,
            password: hashedPassword,
        };
        try {
            await this.db.addUser(newUser);
            Logger.info(`Udało się dodać nowego użytkownika ${newUser.id}`);
        } catch (error) {
            if(error instanceof DomainError || error instanceof InfrastructureError) throw error;

            throw new InfrastructureError("Wystąpił nieoczekiwany błąd podczas tworzenia konta użytkownika", error);
        }

    }
    async updateUserEmail(user: IUser, newEmail: string): Promise<void> {
        Logger.info(`Aktualizacja maila użytkownika ${user.id}`);

        try {
            const existingUser =  await this.db.findUserByEmail(newEmail);
            if (existingUser) {
                throw new DomainError(`Email ${newEmail} jest już zajęty`);
            }

            user.email = newEmail;

            await this.db.updateUser(user.id, user);

            Logger.info(`Pomyślnie zaktualizowano email użytkownika ${user.id}`);
        } catch (error) {
            if(error instanceof DomainError) throw error;

            throw new InfrastructureError("Wystąpił nieoczekiwany błąd podczas aktualizowania maila", error);
        }

    }
}