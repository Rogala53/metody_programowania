import type { IPassenger } from "../interfaces/IPassenger.ts";

export class Passenger implements IPassenger {
    public firstName: string;
    public lastName: string;
    public passportNumber: string;
    public phoneNumber: string;

    constructor(firstName: string, lastName: string, passportNumber: string, phoneNumber: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.passportNumber = passportNumber;
        this.phoneNumber = phoneNumber;
    }

}