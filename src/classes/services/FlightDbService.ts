import {DbService} from "./DbService"
import type {Flight} from "../Flight"
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria"
export class FlightDbService extends DbService {
    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }
    addFlightInDb(flight: Flight): boolean;
    deleteFlightInDb(flight: Flight): boolean;
    findFlightsInDb(criteria: FlightSearchCriteria): Flight[];
    findFlightInDbById(flightId: string): Flight | null;
    updateFlightSeatsInDb(flightId: string, newSeatsCount: number): boolean;
}
