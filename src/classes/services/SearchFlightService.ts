class SearchFlightService {
    findFlights(criteria: FlightSearchCriteria): Flight[];
    getFlightDetails(flightId: string): Flight | null;
    setAvailableSeats(flightId: string, availableSeats: number): boolean;

}