export interface IFlight {
    id: number;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    airline: string;
    availableSeats: number;
    price: number;
}