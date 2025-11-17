import {Flight} from "../Flight.ts";
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria.ts";
import type {FlightDbService} from "./FlightDbService.ts";

export class SearchFlightService {
    private db: FlightDbService;
    constructor(db: FlightDbService) {
        this.db = db;
    }
    async findFlights(criteria: FlightSearchCriteria): Promise<Flight[]> {
        if(criteria.passengerCount <= 0) {
            throw new Error("Liczba pasażerów musi być dodatnia");
        }
        return this.db.findFlightsInDb(criteria);

    }
    async getFlightDetails(flightId: string): Promise<Flight | null> {
        return this.db.findFlightInDbById(flightId);
    }
    async updateAvailableSeats(flightId: string, seatsToReserve: number): Promise <boolean> {
        const flight = await this.db.findFlightInDbById(flightId);
        if(!flight) {
            throw new Error("Lot nie istnieje");
        }
        const newSeats = flight.availableSeats - seatsToReserve;
        if(newSeats < 0) {
            throw new Error("Brak wystarczającej liczby miesjc");
        }

        return this.db.updateFlightSeatsInDb(flightId, newSeats);
    }

}