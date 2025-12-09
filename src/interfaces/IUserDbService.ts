import type {IUser} from "./IUser.ts";

export interface IUserDbService {
    addUser(newUser: IUser): Promise<void>;
    deleteUser(userId: number): Promise<void>;
    updateUser(userId: number, newUser: IUser): Promise<void>;
    findUserByEmail(email: string): Promise<IUser | null>;
}