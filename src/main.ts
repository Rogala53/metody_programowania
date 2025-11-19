import { FlightDbService } from "./classes/services/FlightDbService";
import { UserDbService } from "./classes/services/UserDbService.ts";
import { ReservationDbService} from "./classes/services/ReservationDbService.ts";
import { SearchFlightService } from "./classes/services/SearchFlightService";
import { PaymentService } from "./classes/services/PaymentService";
import { TicketService } from "./classes/services/TicketService";
import { ReservationService } from "./classes/services/ReservationService";
import { User } from "./classes/User";
import { Flight } from "./classes/Flight";
import { Passenger } from "./classes/Passenger";
import type { ReservationCriteria } from "./types/ReservationCriteria";

async function main() {
    console.log("Inicjalizacja");

    // 1. Warstwa Danych
    const flightDb = new FlightDbService("flights_db", "localhost", "admin", "1234");
    const userDb = new UserDbService("users_db", "localhost", "admin", "1234");
    const resDb = new ReservationDbService("reservations_db", "localhost", "admin", "1234");

    // Inicjalizacja danych testowych
    const sampleFlight = new Flight(101, "Warszawa", "Nowy Jork", new Date("2023-12-01"), new Date("2023-12-02"), "LOT", 100, 2500);
    await flightDb.addFlight(sampleFlight);

    const user = new User(1, "jan_kowalski", "jan@example.com", "tajnehaslo");
    await userDb.addUser(user);

    // 2. Warstwa Usług Domenowych (Services)
    const flightService = new SearchFlightService(flightDb);
    const paymentService = new PaymentService();
    const ticketService = new TicketService();

    // 3. Główna logika
    const reservationService = new ReservationService(
        resDb,      // IReservationDbService
        ticketService,  // ITicketService
        paymentService, // IPaymentService
        flightService   // IFlightService
    );

    console.log("\nPRZYPADEK UŻYCIA 1: Wyszukiwanie Lotów");
    const foundFlights = await flightService.findFlights({
        origin: "Warszawa",
        destination: "Nowy Jork",
        date: new Date("2023-12-01"),
        passengerCount: 2
    });
    console.log(`Znaleziono lotów: ${foundFlights.length}`);
    if(foundFlights.length === 0) return;

    console.log("\nPRZYPADEK UŻYCIA 2: Tworzenie Rezerwacji");
    const selectedFlight = foundFlights[0];
    const passengers = [
        new Passenger("Jan", "Kowalski", "ABC12345", "123456789"),
        new Passenger("Anna", "Kowalska", "DEF67890", "987654321")
    ];

    const criteria: ReservationCriteria = {
        id: 999, // Tymczasowe ID
        flightId: selectedFlight.id,
        paymentId: 0, // Zostanie nadane
        user: user,
        passengers: passengers,
        tickets: [], // Zostaną dodane
        ticketsClass: "economic",
        status: "pending",
        totalPrice: 0, // Zostanie obliczone
        createdAt: new Date()
    };

    const isReserved = await reservationService.createReservation(criteria);

    if (isReserved) {
        console.log("STATUS: Rezerwacja zakończona pomyślnie.");
    } else {
        console.log("STATUS: Błąd rezerwacji.");
    }

    console.log("\n WERYFIKACJA STANU");
    const flightAfter = await flightService.getFlightDetails(101);
    console.log(`Dostępne miejsca po rezerwacji: ${flightAfter?.availableSeats} (Oczekiwano: 98)`);

    console.log("\PRZYPADEK UŻYCIA 3: Anulowanie Rezerwacji");
    // Symulacja pobranie rezerwacji z bazy (w pamięci jest tylko lokalną zmienną)
    const reservationToCancel = { ...criteria, status: "confirmed" as const, totalPrice: 5000 };

    const isCanceled = await reservationService.cancelReservation(reservationToCancel);
    console.log(`STATUS Anulowania: ${isCanceled}`);

    const flightFinal = await flightService.getFlightDetails(101);
    console.log(`Dostępne miejsca po anulowaniu: ${flightFinal?.availableSeats} (Oczekiwano: 100)`);
}

main();




































