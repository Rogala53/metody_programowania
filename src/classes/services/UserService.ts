import type {LoginCriteria} from "../../types/LoginCriteria.ts";
import type {UserCriteria} from "../../types/UserCriteria.ts";
import {User} from "../User.ts";
import type {UserAndReservationDbService} from "./UserAndReservationDbService.ts";

class UserService {
    private db: UserAndReservationDbService;
    constructor(db: UserAndReservationDbService) {
        this.db = db;
    }
    LogIn(user: LoginCriteria): User | null;
    createAccount(data: UserCriteria): User;
    updateUserEmail(user: User, newEmail: string): User | null;
}