import type {TicketCriteria} from "../../types/TicketCriteria.ts";
import {Ticket} from "../Ticket.ts";
import type {IUser} from "../../interfaces/IUser.ts";
import type {IReservation} from "../../interfaces/IReservation.ts";
export class TicketService {

    //dodanie generatora PDF i email klienta
    constructor() {}
    async generateAndSendTicket(reservation: IReservation, user: IUser): Promise<boolean> {
        console.log(`Generowanie biletu dla rezerwacji ${reservation.id}`);

        const ticketData: TicketCriteria = {
            id: 152, //przykładowe id
            reservationId: reservation.id,
            userId: reservation.user.id,
            passengers: reservation.passengers,
            seatNumber: "12A",
            ticketClass: "economic"
        };
        const ticket = new Ticket(ticketData);
        //generowanie pdf i wysyłka na email użytkownika
        this.generateTicket(ticket);

        await new Promise(resolve => setTimeout(resolve, 1000));

        this.sendEmail(ticket, user.email);
        console.log(`Bilet ${ticket.id} wysłany na email użytkownika o id ${reservation.user.id}`);
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