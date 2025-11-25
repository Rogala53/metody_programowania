import type {IFlight} from "../../interfaces/IFlight.ts";
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria.ts";
import type {IFlightDbService} from "../../interfaces/IFlightDbService.ts";
import type {IFlightService} from "../../interfaces/IFlightService.ts";
import {DomainError} from "../../exceptions/DomainError.ts";
import {Logger} from "../Logger.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";

export class FlightService implements IFlightService {
    private db: IFlightDbService;
    constructor(db: IFlightDbService) {
        this.db = db;
    }
    async findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]> {
        try {
            if(criteria.passengerCount <= 0) {
                throw new DomainError("Liczba pasażerów musi być dodatnia");
            }
            return await this.db.findFlights(criteria);
        } catch (error) {
            if (error instanceof DomainError) throw error;
            throw new InfrastructureError(`Wystąpił krytyczny błąd podczas wyszukiwania lotów`, error);
        }
    }
    async getFlightDetails(flightId: number): Promise<IFlight | null> {
        Logger.info(`Wyszukiwanie informacji o locie ${flightId}`)
        try {
            return await this.db.findFlightById(flightId);
        } catch (error) {
            Logger.error(`Serwis: Błąd podczas pobierania detali lotu ${flightId}`, error);
            throw error;
        }
    }
    async updateAvailableSeats(flightId: number, seats: number): Promise <void> {
        //jeśli seats jest ujemne, funkcja zwiększa ilość miejsc (na przykład przy anulowaniu rezerwacji)

        Logger.info(`Rozpoczęcie aktualizacji liczby miejsc lotu ${flightId}`);
        try {
            const flight: IFlight | null = await this.db.findFlightById(flightId);

            if(!flight) {
                throw new DomainError(`Nie znaleziono lotu o id ${flightId}`);
            }
            const newSeats = flight.availableSeats - seats;
            if(seats > 0) {
                if(newSeats < 0) {
                    throw new DomainError(`Brak wystarczającej liczby miejsc lotu ${flightId}`);
                }
            }

            await this.db.updateFlightSeats(flightId, newSeats);

            Logger.info(`Zaktualizowano liczbę miejsc lotu ${flightId}`);
        }
        catch(error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Krytyczny błąd podczas aktualizowania liczby miejsc`, error)
        }
    }
}