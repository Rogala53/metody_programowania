import {Flight} from "../Flight.ts";
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria.ts";
import type {IFlightDbService} from "../../interfaces/IFlightDbService.ts";
import type {ISearchFlightService} from "../../interfaces/ISearchFlightService.ts";

export class SearchFlightService implements ISearchFlightService {
    private db: IFlightDbService;
    constructor(db: IFlightDbService) {
        this.db = db;
    }
    async findFlights(criteria: FlightSearchCriteria): Promise<Flight[]> {
        if(criteria.passengerCount <= 0) {
            throw new Error("Liczba pasażerów musi być dodatnia");
        }
        return this.db.findFlights(criteria);

    }
    async getFlightDetails(flightId: number): Promise<Flight | null> {
        return this.db.findFlightById(flightId);
    }
    async updateAvailableSeats(flightId: number, seats: number): Promise <boolean> {
        const flight = await this.db.findFlightById(flightId);
        if(!flight) {
            throw new Error("Lot nie istnieje");
        }
        let newSeats: number;
        if(seats > 0) {
            newSeats = flight.availableSeats - seats;
            if(newSeats < 0) {
                throw new Error("Brak wystarczającej liczby miejsc");
            }
        }
        else {
            newSeats = flight.availableSeats - seats;
        }
        return this.db.updateFlightSeats(flightId, newSeats);
    }


}