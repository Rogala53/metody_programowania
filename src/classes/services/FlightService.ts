import type {IFlight} from "../../interfaces/IFlight.ts";
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria.ts";
import type {IFlightDbService} from "../../interfaces/IFlightDbService.ts";
import type {IFlightService} from "../../interfaces/IFlightService.ts";
import {DataNotFoundError} from "../../exceptions/DataNotFoundError.ts";

export class FlightService implements IFlightService {
    private db: IFlightDbService;
    constructor(db: IFlightDbService) {
        this.db = db;
    }
    async findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]> {
        if(criteria.passengerCount <= 0) {
            throw new RangeError("Liczba pasażerów musi być dodatnia");
        }
        return this.db.findFlights(criteria);

    }
    async getFlightDetails(flightId: number): Promise<IFlight | null> {
        const flight: Promise<IFlight | null> = this.db.findFlightById(flightId);
        if(flight) {
            return flight;
        }
        else {
            throw new DataNotFoundError("Lot o takim id nie istnieje");
        }

    }
    async updateAvailableSeats(flightId: number, seats: number): Promise <boolean> {
        let newSeats: number = 0;
        try {
            const flight = await this.db.findFlightById(flightId);
            if(!flight) {
                throw new DataNotFoundError("Lot nie istnieje");
            }
            if(seats > 0) {
                newSeats = flight.availableSeats - seats;
                if(newSeats < 0) {
                    throw new RangeError("Brak wystarczającej liczby miejsc");
                }
            }
            else {
                newSeats = flight.availableSeats - seats;
                return this.db.updateFlightSeats(flightId, newSeats);
            }
        }
        catch(error) {
            console.error(error)
        }
        return false;
        
    }


}