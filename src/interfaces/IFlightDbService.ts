import type {IFlight} from "./IFlight.ts";
import type {FlightSearchCriteria} from "../types/FlightSearchCriteria.ts";

export interface IFlightDbService {
    addFlight(flight: IFlight): Promise<void>;
    deleteFlight(flight: IFlight): Promise<void>;
    findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]>;
    findById(flightId: number): Promise<IFlight | null>;
    updateFlightSeats(flightId: number, newSeats: number): Promise<void>;
}