import type {IUser} from "./IUser.ts";

export interface IUserDbService {
    addUser(newUser: IUser): Promise<boolean>;
    removeUser(userId: number): Promise<boolean>;
    findUserByEmail(email: string): Promise<IUser | undefined>;
}