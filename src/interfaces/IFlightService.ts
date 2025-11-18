import type {IFlight} from "./IFlight.ts";


export interface IFlightService {
    getFlightDetails(flightId: number): Promise<IFlight | null>;
    updateAvailableSeats(flightId: number, seats: number): Promise<boolean>;
}