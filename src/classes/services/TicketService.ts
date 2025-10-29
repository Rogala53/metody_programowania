import type {TicketCriteria} from "../../types/TicketCriteria.ts";
import {Ticket} from "../Ticket.ts";

export class TicketService {
    constructor() {
    }
    createTicket(criteria: TicketCriteria): boolean;
    generateTicket(ticket: Ticket): boolean;
    sendEmail(ticket: Ticket, mail: string): boolean;
}