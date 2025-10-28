class TicketService {
    createTicket(criteria: TicketCriteria): boolean;
    generateTicket(ticket: Ticket): boolean;
    sendEmail(ticket: Ticket, mail: string): boolean;
}