class ReservationService {
    createReservation(criteria: ReservationCriteria): boolean;
    editReservation(reservation: Reservation): boolean;
    cancelReservation(reservation: Reservation): boolean;
}