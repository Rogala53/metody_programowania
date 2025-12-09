import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria"
import type {IFlight} from "../../interfaces/IFlight.ts";
import {DomainError} from "../../exceptions/DomainError.ts";
import {Logger} from "../Logger.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";
import {Validator} from "../Validator.ts";
import {CrudRepository} from "../CrudRepository.ts";
import type {IFlightDbService} from "../../interfaces/IFlightDbService.ts";

export class FlightDbService extends CrudRepository<IFlight> implements IFlightDbService {

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }

    async addFlight(flight: IFlight): Promise<void> {
        Logger.info(`DB: Próba dodania lotu ${flight.id}`);
        try {
            this.add(flight);
            Logger.info(`DB: Dodano lot ${flight.id}`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Bład zapisu lotu ${flight.id}`, error as Error);
        }
    }

    async deleteFlight(flight: IFlight): Promise<void> {
        Logger.info(`DB: Usuwanie lotu ${flight.id}`);
        try {
            this.delete(flight.id);

            Logger.info(`DB: Usunięto lot ${flight.id}`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Krytyczny błąd podczas usuwania lotu ${flight.id}`, error as Error);
        }
    }

    async findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]> {
        Logger.info(`DB: Wyszukiwanie lotów: do: ${criteria.destination}, z: ${criteria.origin} data: ${criteria.date}`);
        try {
            //filtrowanie lotów
            return this.items.filter(flight => {
                //sprawdza, czy użytkownik podał np. miasto wylotu, jeśli tak sprawdza czy są równe, jeśli nie to zwraca true
                //żeby nie odrzucić lotu tylko dlatego, że jakieś kryterium nie zostało podane
                const matchesOrigin = criteria.origin ? flight.origin === criteria.origin : true;
                const matchesDest = criteria.destination ? flight.destination === criteria.destination : true;
                const matchesDate = criteria.date ? flight.departureTime.toDateString() === criteria.date.toDateString() : true;
                const hasSeats = criteria.passengerCount ? flight.availableSeats >= criteria.passengerCount : true;

                return matchesOrigin && matchesDest && matchesDate && hasSeats;
            });
        } catch (error) {
            throw new InfrastructureError("Błąd podczas przeszukiwania bazy lotów");
        }
    }

    async updateFlightSeats(flightId: number, newSeatsCount: number): Promise<void> {
        Logger.info(`DB: Rozpoczęcie aktualizacji ilości miejsc dla lotu ${flightId}`)

        try {
            let flight: IFlight | null = await this.findById(flightId);

            if (!flight) {
                throw new DomainError(`Nie znaleziono lotu ${flightId} do aktualizacji`);
            }

            Validator.validatePositiveNumber(newSeatsCount, "Liczba miejsc lotu");

            flight.availableSeats = newSeatsCount;

            Logger.info(`DB: Zaktualizowano liczbę miejsc dla lotu ${flightId} na ${newSeatsCount}`);

        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Błąd aktualizacji miejsc w locie ${flightId}`, error as Error);
        }
    }
}
