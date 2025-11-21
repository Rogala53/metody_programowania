import type {IFlight} from "../../interfaces/IFlight.ts";
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria.ts";
import type {IFlightDbService} from "../../interfaces/IFlightDbService.ts";
import type {IFlightService} from "../../interfaces/IFlightService.ts";

export class FlightService implements IFlightService {
    private db: IFlightDbService;
    constructor(db: IFlightDbService) {
        this.db = db;
    }
    async findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]> {
        if(criteria.passengerCount <= 0) {
            throw new Error("Liczba pasażerów musi być dodatnia");
        }
        return this.db.findFlights(criteria);

    }
    async getFlightDetails(flightId: number): Promise<IFlight> {
        const flight: IFlight = this.db.findFlightById(flightId);
        if(!flight) {
            throw new NotFoundError("Lot o takim id nie istnieje");
        }
        return flight;
    }
    async updateAvailableSeats(flightId: number, seats: number): Promise <boolean> {
        let newSeats: number = 0;
        try {
            const flight = await this.db.findFlightById(flightId);
            if(!flight) {
                throw new Error("Lot nie istnieje");
            }
            if(seats > 0) {
                newSeats = flight.availableSeats - seats;
                if(newSeats < 0) {
                    throw new Error("Brak wystarczającej liczby miejsc");
                }
            }
            else {
                newSeats = flight.availableSeats - seats;
            }

        } 
        catch(error) {

        }
        return this.db.updateFlightSeats(flightId, newSeats);
        
    }


}