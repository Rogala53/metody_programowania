import type {IFlight} from "./IFlight.ts";
import type {FlightSearchCriteria} from "../types/FlightSearchCriteria.ts";

export interface IFlightDbService {
    addFlight(flight: IFlight): Promise<boolean>;
    deleteFlight(flight: IFlight): Promise<boolean>;
    findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]>;
    findFlightById(flightId: number): Promise<IFlight | null>;
    updateFlightSeats(flightId: number, newSeats: number): Promise<boolean>;
}