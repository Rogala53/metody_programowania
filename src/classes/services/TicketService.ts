import type {TicketCriteria} from "../../types/TicketCriteria.ts";
import type {IReservation} from "../../interfaces/IReservation.ts";
import type {ITicketService} from "../../interfaces/ITicketService.ts";
import {Ticket} from "../Ticket.ts";
import type {ITicket} from "../../interfaces/ITicket.ts";

export class TicketService implements ITicketService {

    //dodanie generatora PDF i email klienta
    constructor() {}
    async generateAndSendTickets(reservation: IReservation): Promise<boolean> {
        console.log(`Generowanie biletu dla rezerwacji ${reservation.id}`);
        let tickets: Ticket[] = [];
        for(let i = 0; i < reservation.passengers.length; i++) {
            const ticketData: TicketCriteria = {
                id: 152, //przykładowe id
                reservationId: reservation.id,
                userId: reservation.user.id,
                passenger: reservation.passengers[i],
                seatNumber: "12A", // przykladowy numer miejsca
                ticketClass: reservation.tickets[i].ticketClass,
            };
            const ticket = new Ticket(ticketData);
            tickets.push(ticket);
        }
        //generowanie pdf i wysyłka na email użytkownika
        for(const ticket of tickets) {
             this.generateTicket(ticket);
             this.sendEmail(ticket, reservation.user.email);
        }

        //symulacja generowania biletu, wysyłki email
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Bilety wysłane na email użytkownika o id ${reservation.user.id}`);
        return true;
    }

    generateTicket(ticket: ITicket) {
        console.log(`Generowanie pliku PDF dla ${ticket.id}`);
        return true;
    }
    sendEmail(ticket: ITicket, mail: string): boolean {
        console.log(`Wysyłanie ${ticket.id} na ${mail}`);
        return true;
    }

}