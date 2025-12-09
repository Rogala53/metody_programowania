import type {UserDbService} from "../classes/services/UserDbService.ts";
import type {FlightDbService} from "../classes/services/FlightDbService.ts";
import type {ReservationDbService} from "../classes/services/ReservationDbService.ts";


export interface IDatabaseFactory {
    createUserDb(database: string, server: string, username: string, password: string): UserDbService;
    createFlightDb(database: string, server: string, username: string, password: string): FlightDbService;
    createReservationDb(database: string, server: string, username: string, password: string): ReservationDbService;
}