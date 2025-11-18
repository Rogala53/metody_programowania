import {DbService} from "./DbService"
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria"
import type {IFlight} from "../../interfaces/IFlight.ts";

export class FlightDbService extends DbService {
    private flightsTable: IFlight[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }
    async addFlight(flight: IFlight): Promise<boolean> {
        console.log(`db: dodawanie lotu ${flight.id}`);
        this.flightsTable.push(flight);
        return true;
    }
    async deleteFlight(flight: IFlight): Promise<boolean> {
        const index = this.flightsTable.indexOf(flight);
        if(index > -1) {
            console.log(`db: usuwanie lotu ${flight.id}`);
            this.flightsTable.splice(index, 1);
            return true;
        }
        return false;
    }
    async findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]> {
        console.log("db: szukanie lotów: ", criteria);

        //filtrowanie lotów
        return this.flightsTable.filter(flight => {
            const matchesOrigin = criteria.origin ? flight.origin === criteria.origin : true;
            const matchesDest = criteria.destination ? flight.destination === criteria.destination : true;
            const matchesDate = criteria.date ? flight.departureTime.toDateString() === criteria.date.toDateString() : true;
            const hasSeats = criteria.passengerCount ? flight.availableSeats >= criteria.passengerCount : true;

            return matchesOrigin && matchesDest && matchesDate && hasSeats;
        });
    }
    async findFlightById(flightId: number): Promise<IFlight | null> {
        const flight = this.flightsTable.find(flight => flight.id === flightId);
        return flight || null;
    }
    async updateFlightSeats(flightId: number, newSeatsCount: number): Promise<boolean> {
        const flight = this.flightsTable.find(flight => flight.id === flightId);
        if(flight) {
            console.log(`db: akutalizacja miesjc dla lotu ${flightId}`);
            flight.availableSeats = newSeatsCount;
            return true;
        }
        return false;
    }
}
