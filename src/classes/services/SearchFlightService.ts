import {Flight} from "../Flight.ts";
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria.ts";
import type {FlightDbService} from "./FlightDbService.ts";

export class SearchFlightService {
    private db: FlightDbService;
    constructor(db: FlightDbService) {
        this.db = db;
    }
    findFlights(criteria: FlightSearchCriteria): Flight[];
    getFlightDetails(flightId: string): Flight | null;
    setAvailableSeats(flightId: string, availableSeats: number): boolean;

}