import type {LoginCriteria} from "../../types/LoginCriteria.ts";
import type {UserCriteria} from "../../types/UserCriteria.ts";
import type {IUser} from "../../interfaces/IUser.ts";
import type {IUserDbService} from "../../interfaces/IUserDbService.ts";

class UserService {
    private db: IUserDbService;
    constructor(db: IUserDbService) {
        this.db = db;
    }
    async logIn(credentials: LoginCriteria): Promise<IUser | null> {
        const user = await this.db.findUserByEmail(credentials.username);
        const passwordMatch = (credentials.password == "password");

        if(!user) {
            return null;
        }
        if(passwordMatch) {
            return user;
        }
        else {
            throw new Error("Nieprawidłowa nazwa użytkownika lub hasło");
        }
    }
    async createAccount(data: UserCriteria): Promise<boolean> {
        const hashedPassword = data.password //hash password


        const newUser: IUser = {
            id: 1,
            username: data.username,
            email: data.email,
            password: hashedPassword,
        };
        return this.db.addUser(newUser);
    }
    async updateUserEmail(user: IUser, newEmail: string): Promise<boolean> {
        const userExists: boolean = await this.db.findUserByEmail(newEmail) != null;
        if(userExists) {
            throw new Error("Użytkownik z takim emailem już istnieje");
        }
        else {
             user.email = newEmail;
             return true;
        }

    }
}