import { FlightDbService } from "./classes/services/FlightDbService.ts";
import { UserDbService } from "./classes/services/UserDbService.ts";
import { ReservationDbService} from "./classes/services/ReservationDbService.ts";
import { FlightService } from "./classes/services/FlightService.ts";
import { PaymentService } from "./classes/services/PaymentService.ts";
import { TicketService } from "./classes/services/TicketService.ts";
import { ReservationService } from "./classes/services/ReservationService.ts";
import { User } from "./classes/User.ts";
import { Flight } from "./classes/Flight.ts";
import { Passenger } from "./classes/Passenger.ts";
import type { ReservationCriteria } from "./types/ReservationCriteria.ts";
import { Logger } from "./classes/Logger.ts";
import { DomainError } from "./exceptions/DomainError.ts";
import { InfrastructureError  } from "./exceptions/InfrastructureError.ts";
import type {ITicket} from "./interfaces/ITicket.ts";

async function main() {
    console.log("Inicjalizacja systemu...");

    // 1. Warstwa Danych (Infrastruktura)
    const flightDb = new FlightDbService("flights_db", "localhost", "admin", "1234");
    const userDb = new UserDbService("users_db", "localhost", "admin", "1234");
    const resDb = new ReservationDbService("reservations_db", "localhost", "admin", "1234");

    // Inicjalizacja danych testowych
    try {
        const sampleFlight = new Flight(101, "Warszawa", "Nowy Jork", new Date("2023-12-01"), new Date("2023-12-02"), "LOT", 100, 2500);
        await flightDb.addFlight(sampleFlight);

        const user = new User(1, "jan_kowalski", "jan@example.com", "tajnehaslo");
        await userDb.addUser(user);
    } catch (err) {
        Logger.error("Błąd podczas inicjalizacji danych testowych", err);
    }

    // 2. Warstwa Usług Domenowych
    // Tablica biletów w pamięci (zastępuje DB biletów w tym prostym przykładzie)
    const ticketRepo: ITicket[] = [];
    const flightService = new FlightService(flightDb);
    const paymentService = new PaymentService();
    const ticketService = new TicketService(ticketRepo);

    // 3. Główna logika (Orchestrator)
    const reservationService = new ReservationService(
        resDb,
        ticketService,
        paymentService,
        flightService
    );

    try {
        console.log("\n=== PRZYPADEK UŻYCIA 1: Wyszukiwanie Lotów ===");
        const foundFlights = await flightService.findFlights({
            origin: "Warszawa",
            destination: "Nowy Jork",
            date: new Date("2023-12-01"),
            passengerCount: 2
        });

        console.log(`Znaleziono lotów: ${foundFlights.length}`);
        if(foundFlights.length === 0) return;

        console.log("\n=== PRZYPADEK UŻYCIA 2: Tworzenie Rezerwacji ===");
        const selectedFlight = foundFlights[0];
        // Pobieramy usera (w realnej apce byłby zalogowany)
        const currentUser = await userDb.findUserByEmail("jan@example.com");

        if (!currentUser) throw new Error("Użytkownik testowy nie istnieje");

        const passengers = [
            new Passenger("Jan", "Kowalski", "ABC12345", "123456789"),
            new Passenger("Anna", "Kowalska", "DEF67890", "987654321")
        ];

        const criteria: ReservationCriteria = {
            id: 999,
            flightId: selectedFlight.id,
            paymentId: 12345, // ID płatności
            user: currentUser,
            passengers: passengers,
            tickets: [],
            ticketsClass: "economic",
            status: "pending",
            totalPrice: 0, // Zostanie obliczone w serwisie
            createdAt: new Date()
        };

        // ZMIANA: Teraz używamy try-catch zamiast if(result)
        await reservationService.createReservation(criteria);
        console.log("STATUS: Rezerwacja zakończona pomyślnie! Bilety wysłane.");


        console.log("\n=== WERYFIKACJA STANU PO REZERWACJI ===");
        const flightAfter = await flightService.getFlightDetails(101);
        console.log(`Dostępne miejsca: ${flightAfter?.availableSeats} (Oczekiwano: 98)`);


        console.log("\n=== PRZYPADEK UŻYCIA 3: Anulowanie Rezerwacji ===");
        // Symulujemy pobranie pełnego obiektu rezerwacji z bazy (tutaj uproszczenie)
        const reservationToCancel = { ...criteria, status: "confirmed" as const, totalPrice: 5000 };

        await reservationService.cancelReservation(reservationToCancel);
        console.log("STATUS: Rezerwacja anulowana pomyślnie. Zwrot środków zlecony.");

        const flightFinal = await flightService.getFlightDetails(101);
        console.log(`Dostępne miejsca po anulowaniu: ${flightFinal?.availableSeats} (Oczekiwano: 100)`);

    } catch (error) {
        // Centralna obsługa błędów aplikacji
        console.log("\n!!! WYSTĄPIŁ BŁĄD !!!");

        if (error instanceof DomainError) {
            Logger.warn(`Błąd walidacji/domeny: ${error.message}`);
            // Np. wyświetl komunikat użytkownikowi na UI
        } else if (error instanceof InfrastructureError) {
            Logger.error(`Awaria systemu: ${error.message}`, error.originalError);
            // Np. wyślij alert do admina
        } else {
            Logger.error("Nieznany błąd krytyczny", error);
        }
    }
}

main();