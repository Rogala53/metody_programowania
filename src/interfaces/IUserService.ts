import type {LoginCriteria} from "../types/LoginCriteria.ts";
import type {IUser} from "./IUser.ts";

export interface IUserService {
    logIn(credentials: LoginCriteria): Promise<IUser>;
}