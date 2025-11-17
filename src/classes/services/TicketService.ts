import type {TicketCriteria} from "../../types/TicketCriteria.ts";
import {Ticket} from "../Ticket.ts";
import type {Reservation} from "../Reservation.ts";

export class TicketService {

    //dodanie generatora PDF i email klienta
    constructor() {}
    async generateAndSendTicket(reservation: Reservation): Promise<boolean> {
        console.log(`Generowanie biletu dla rezerwacji ${reservation.id}`);

        const ticketData: TicketCriteria = {
            reservationId: reservation.id,
            passenger: reservation.Passenger,
            seatNumber: "12A",
            ticketClass: "economic"
        };
        const ticket = new Ticket(ticketData);


        //generowanie pdf i wysyłka na email pasażera
        generateTicket(ticket)

        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log(`Bilet ${ticket.id} wysłany na email użytkownika o id ${reservation.userId}`);
        return true;
    }

    generateTicket(ticket: Ticket) {
        console.log(`Generowanie pliku PDF dla ${ticket.id}`);
        return true;
    }
    sendEmail(ticket: Ticket, mail: string): boolean {
        console.log(`Wysyłanie ${ticket.id} na ${mail}`);
        return true;
    }

}

