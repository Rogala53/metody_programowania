
import type {IFlight} from "./IFlight.ts";

export interface ISearchFlightService {
    getFlightDetails(flightId: number): Promise<IFlight | null>;
    updateAvailableSeats(flightId: number, seats: number): Promise <boolean>;
}