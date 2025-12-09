import type {IReservationDbService} from "../../interfaces/IReservationDbService.ts";
import type {IReservation} from "../../interfaces/IReservation.ts";
import { Logger } from "../Logger.ts";
import { DomainError } from "../../exceptions/DomainError.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";
import {CrudRepository} from "../CrudRepository.ts";

export class ReservationDbService extends CrudRepository<IReservation> implements IReservationDbService {

    constructor(database: string, server: string, username: string, password: string) {
        super(database, server, username, password);
    }

    async addReservation(reservation: IReservation): Promise<void> {
        Logger.info(`DB: Rozpoczęcie dodawania rezerwacji ${reservation.id} dla użytkownika ${reservation.user.username}`);

        try {
            this.add(reservation);
            Logger.info(`DB: pomyślnie dodano rezerwację ${reservation.id}`);
        } catch (error) {
            throw new InfrastructureError(`DB: Nie udało się dodać rezerwacji do bazy danych`, error as Error);
        }


    }

    async deleteReservation(reservation: IReservation): Promise<void> {
        Logger.info(`DB: Rozpoczęcie usuwania rezerwacji ${reservation.id} `);
        try {
            await this.delete(reservation.id);
            Logger.info(`DB: Usunięto rezerwację ${reservation.id}`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`DB: Nie znaleziono rezerwacji ${reservation.id}`, error as Error);
        }

    }

    async updateReservation(reservationId: number, reservation: IReservation): Promise<void> {
        Logger.info(`DB: Rozpoczęcie aktualizacji rezerwacji ${reservation.id} `);

        try {
            this.update(reservationId, reservation);
            Logger.info(`DB: Pomyślnie zaktualizowano rezerwację ${reservation.id}`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`DB: Wystąpił błąd podczas aktualizacji rezerwacji ${reservation.id}`, error as Error);
        }
    }
}