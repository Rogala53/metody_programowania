import type {LoginCriteria} from "../../types/LoginCriteria.ts";
import type {UserCriteria} from "../../types/UserCriteria.ts";
import {User} from "../User.ts";
import type {UserAndReservationDbService} from "./UserAndReservationDbService.ts";

class UserService {
    private db: UserAndReservationDbService;
    constructor(db: UserAndReservationDbService) {
        this.db = db;
    }
    async logIn(credentials: LoginCriteria): Promise<User> {
        const user = await this.db.findUserByEmailInDb(credentials.username);
        const passwordMatch = (credentials.password == "password");

        if(passwordMatch) {
            return user;
        }
        else {
            throw new Error("Nieprawidłowa nazwa użytkownika lub hasło");
        }
    }
    async createAccount(data: UserCriteria): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser: User = {
            id: Math.random(),
            username: data.username,
            email: data.email,
            password: hashedPassword,
        };
        return this.db.addUserInDb(newUser);
    }
    async updateUserEmail(user: User, newEmail: string): Promise<User | null> {
        const userExists: boolean = this.db.findUserByEmailInDb(user.email) != null;
        if(userExists) {
            throw new Error("Użytkownik z takim emailem już istnieje");
        }
        else {
             user.email = newEmail;
        }

    }
}