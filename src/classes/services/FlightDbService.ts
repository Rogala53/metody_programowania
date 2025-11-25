import {DbService} from "./DbService"
import type {FlightSearchCriteria} from "../../types/FlightSearchCriteria"
import type {IFlight} from "../../interfaces/IFlight.ts";
import {DomainError} from "../../exceptions/DomainError.ts";
import {Logger} from "../Logger.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";

export class FlightDbService extends DbService {
    private flightsTable: IFlight[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }

    async addFlight(flight: IFlight): Promise<void> {
        Logger.info(`DB: Próba dodania lotu ${flight.id}`);
        try {
            if (this.flightsTable.some(f => f.id === flight.id)) {
                throw new DomainError(`Lot o id ${flight.id} już istnieje w bazie`);
            }

            this.flightsTable.push(flight);
            Logger.info(`DB: Dodano lot ${flight.id}`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Bład zapisu lotu ${flight.id}`, error);
        }
    }

    async deleteFlight(flight: IFlight): Promise<void> {
        Logger.info(`DB: Usuwanie lotu ${flight.id}`);
        try {
            const index = this.flightsTable.findIndex(f => f.id === flight.id);
            if (index === -1) {
                throw new DomainError(`Lot ${flight.id} nie istnieje w bazie danych`);
            }

            this.flightsTable.splice(index, 1);
            Logger.info(`DB: Usunięto lot ${flight.id}`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Krytyczny błąd podczas usuwania lotu ${flight.id}`, error);
        }
    }

    async findFlights(criteria: FlightSearchCriteria): Promise<IFlight[]> {
        Logger.info(`DB: Wyszukiwanie lotów: do: ${criteria.destination}, z: ${criteria.origin} data: ${criteria.date}`);
        try {
            //filtrowanie lotów
            return this.flightsTable.filter(flight => {
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

    async findFlightById(flightId: number): Promise<IFlight | null> {
        try {
            const flight = this.flightsTable.find(flight => flight.id === flightId);
            return flight || null;
        } catch (error) {
            throw new InfrastructureError(`Błąd odczytu lotu ${flightId}`, error);
        }

    }

    async updateFlightSeats(flightId: number, newSeatsCount: number): Promise<void> {
        Logger.info(`DB: Rozpoczęcie aktualizacji ilości miejsc dla lotu ${flightId}`)

        try {
            let flight: IFlight | null = await this.findFlightById(flightId);

            if (!flight) {
                throw new DomainError(`Nie znaleziono lotu ${flightId} do aktualizacji`);
            }
            if (newSeatsCount < 0) {
                throw new DomainError("Liczba miejsc nie może być ujemna");
            }

            flight.availableSeats = newSeatsCount;

            Logger.info(`DB: Zaktualizowano liczbę miejsc dla lotu ${flightId} na ${newSeatsCount}`);

        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Błąd aktualizacji miejsc w locie ${flightId}`, error);
        }
    }
}
