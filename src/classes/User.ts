import type {IUser} from "../interfaces/IUser"
class User implements IUser {
    public id: number;
    public username: string;
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;

    constructor(id: number, username: string, email: string, password: string, firstName: string, lastName: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}