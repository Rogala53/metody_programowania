class FlightDbService extends DbService {
    addFlightInDb(flight: Flight): boolean;
    deleteFlightInDb(flight: Flight): boolean;
    findFlightsInDb(criteria: FlightSearchCriteria): Flight[];
    findFlightInDbById(flightId: string): Flight | null;
    updateFlightSeatsInDb(flightId: string, newSeatsCount: number): boolean;
}
