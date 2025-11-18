import {DbService} from "./DbService"
import type {Flight} from "../Flight"
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria"
export class FlightDbService extends DbService {
    private flightsTable: Flight[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }
    async addFlightInDb(flight: Flight): Promise<boolean> {
        console.log(`db: dodawanie lotu ${flight.id}`);
        this.flightsTable.push(flight);
        return true;
    }
    deleteFlightInDb(flight: Flight): boolean {
        const index = this.flightsTable.indexOf(flight);
        if(index > -1) {
            console.log(`db: usuwanie lotu ${flight.id}`);
            this.flightsTable.splice(index, 1);
            return true;
        }
        return false;
    }
    findFlightsInDb(criteria: FlightSearchCriteria): Flight[] {
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
    async findFlightInDbById(flightId: number): Promise<Flight | null> {
        const flight = this.flightsTable.find(flight => flight.id === flightId);
        return flight || null;
    }
    async updateFlightSeatsInDb(flightId: number, newSeatsCount: number): Promise<boolean> {
        const flight = this.flightsTable.find(flight => flight.id === flightId);
        if(flight) {
            console.log(`db: akutalizacja miesjc dla lotu ${flightId}`);
            flight.availableSeats = newSeatsCount;
            return true;
        }
        return false;
    }
}
