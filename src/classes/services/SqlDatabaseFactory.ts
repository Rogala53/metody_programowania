import type {IDatabaseFactory} from "../../interfaces/IDatabaseFactory.ts";
import {UserDbService} from "./UserDbService.ts";
import {FlightDbService} from "./FlightDbService.ts";
import {ReservationDbService} from "./ReservationDbService.ts";

export class SqlDatabaseFactory implements IDatabaseFactory {
    createFlightDb(database: string, server: string, username: string, password: string): FlightDbService {
        return new FlightDbService(database, server, username, password);
    }

    createReservationDb(database: string, server: string, username: string, password: string): ReservationDbService {
        return new ReservationDbService(database, server, username, password);
    }

    createUserDb(database: string, server: string, username: string, password: string): UserDbService {
        return new UserDbService(database, server, username, password);
    }

}