import type {IReservationDbService} from "../../interfaces/IReservationDbService.ts";
import type {IReservation} from "../../interfaces/IReservation.ts";
import {DbService} from "./DbService.ts";
import { Logger } from "../Logger.ts";
import { DomainError } from "../../exceptions/DomainError.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";

export class ReservationDbService extends DbService implements IReservationDbService {
    private reservations: IReservation[] = [];

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }

    async addReservation(reservation: IReservation): Promise<void> {
        Logger.info(`DB: Rozpoczęcie dodawania rezerwacji ${reservation.id} dla użytkownika ${reservation.user.username}`);

        if(this.reservations.some(r => r.id === reservation.id)) {
            throw new DomainError(`Rezerwacja o numerze id ${reservation.id} już istnieje`);
        }

        try {
            this.reservations.push(reservation);
            Logger.info(`DB: pomyślnie dodano rezerwację ${reservation.id}`);
        } catch (error) {
            throw new InfrastructureError(`DB: Nie udało się dodać rezerwacji do bazy danych`, error);
        }


    }

    async removeReservation(reservation: IReservation): Promise<void> {
        Logger.info(`DB: Rozpoczęcie usuwania rezerwacji ${reservation.id} `);

        try {
            const index = this.reservations.findIndex(r => r.id === reservation.id);
            if(index > -1) {
                this.reservations.splice(index, 1);
                Logger.info(`DB: Usunięto rezerwację ${reservation.id}`);
            }
            else {
                throw new DomainError(`DB: Nie znaleziono rezerwacji ${reservation.id}`);
            }
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`DB: Nie znaleziono rezerwacji ${reservation.id}`, error);
        }

    }

    async updateReservation(reservation: IReservation): Promise<void> {
        Logger.info(`DB: Rozpoczęcie aktualizacji rezerwacji ${reservation.id} `);

        try {
            const index = this.reservations.findIndex(r => r.id === reservation.id);

            if(index > -1) {
                this.reservations[index] = reservation;
                Logger.info(`DB: Pomyślnie zaktualizowano rezerwację ${reservation.id}`);
            }
            else {
                throw new DomainError("DB: Nie znaleziono rezerwacji");
            }
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`DB: Wystąpił błąd podczas aktualizacji rezerwacji ${reservation.id}`, error);
        }
    }
}