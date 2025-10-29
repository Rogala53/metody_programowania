import type {ReservationCriteria} from "../../types/ReservationCriteria.ts";
import {Reservation} from "../Reservation.ts";
import {TicketService} from "./TicketService.ts";
import {PaymentService} from "./PaymentService.ts";
import {SearchFlightService} from "./SearchFlightService.ts";
class ReservationService {
    private ticketService: TicketService;
    private paymentService: PaymentService;
    private searchFlightService: SearchFlightService;
    createReservation(criteria: ReservationCriteria): boolean;
    editReservation(reservation: Reservation): boolean;
    cancelReservation(reservation: Reservation): boolean;
}