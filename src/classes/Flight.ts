import type { IFlight } from "../interfaces/IFlight"
export class Flight implements IFlight {
    public id: number;
    public origin: string;
    public destination: string;
    public departureTime: Date;
    public arrivalTime: Date;
    public airline: string;
    public availableSeats: number;
    public price: number;

    constructor(id: number, origin: string, destination: string, departureTime: Date, arrivalTime: Date,
                airline: string, availableSeats: number, price: number) {
        this.id = id;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.airline = airline;
        this.availableSeats = availableSeats;
        this.price = price;
    }

}