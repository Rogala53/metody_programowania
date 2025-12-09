import type {IReservation} from "../../interfaces/IReservation.ts";
import type {ITicketService} from "../../interfaces/ITicketService.ts";
import type {ITicket} from "../../interfaces/ITicket.ts";
import {Logger} from "../Logger.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";
import {TicketBuilder} from "../TicketBuilder.ts";

export class TicketService implements ITicketService {
    public tickets: ITicket[];

    //dodanie generatora PDF i email klienta
    constructor(tickets: ITicket[]) {
        this.tickets = tickets;
    }

    async generateAndSendTickets(reservation: IReservation): Promise<void> {
        Logger.info(`Rozpoczęcie generowania biletów dla rezerwacji ${reservation.id}`);

        try {
            const newTickets: ITicket[] = [];
            for (let i = 0; i < reservation.passengers.length; i++) {
                const ticket: ITicket = this.createTicket(reservation, i);
                newTickets.push(ticket);
            }

            this.tickets.push(...newTickets);

            for (const ticket of newTickets) {
                await this.generateTicket(ticket);
                await this.sendEmail(ticket, reservation.user.email);
            }

            Logger.info(`Bilety pomyślnie wysłane do użytkownika ${reservation.id}`);

        } catch (error) {
            Logger.error(`Krytyczny błąd w procesie biletowania dla rezerwacji ${reservation.id}`);

            if (error instanceof InfrastructureError) {
                throw error;
            }
            throw new InfrastructureError("Nie udało się wygenerować lub wysłać biletu");
        }

    }

    private createTicket(reservation: IReservation, index: number): ITicket {

        return new TicketBuilder()
            .setId(111)
            .setReservationId(reservation.id)
            .setUserId(reservation.user.id)
            .setPassenger(reservation.passengers[index])
            .setSeatNumber("12A")
            .setTicketClass(reservation.ticketsClass)
            .build();
    }

    private async generateTicket(ticket: ITicket): Promise<void> {
        Logger.debug(`Generowanie pliku PDF dla biletu ${ticket.id}`);
        try {
            //generowanie pliku PDF z biletem
            if (Math.random() < 0.1) throw new Error("Błąd biblioteki PDF");
        } catch (error) {
            throw new InfrastructureError(`Błąd generowania PDF dla biletu ${ticket.id}`, error as Error);
        }

    }

    private async sendEmail(ticket: ITicket, mail: string): Promise<void> {
        Logger.debug(`Bilet wysłany na email ${mail} użytkownika o id ${ticket.userId}`);
        try {
            //wysyłanie maila z wygenerowanym biletem w formacie PDF
        } catch (error) {
            throw new InfrastructureError(`Błąd wysyłki email do ${mail}`, error as Error);
        }
    }

}