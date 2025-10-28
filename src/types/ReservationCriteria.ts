type ReservationCriteria = {
    userId: string;
    flightId: string;
    passengers: Passenger[];
    status: ReservationStatus;
    totalPrice: number;
    createdAt: Date;
}