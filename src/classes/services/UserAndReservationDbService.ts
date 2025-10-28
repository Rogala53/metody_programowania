class UserAndReservationDbService extends DbService {
    addUserInDb(user: User): boolean;
    removeUserInDb(user: User): boolean;
    addReservationInDb(user: User, reservation: Reservation): boolean;
    removeReservationInDb(reservation: Reservation): boolean;
    updateReservationInDb(reservation: Reservation): boolean;
    findUserByEmailInDb(email: string): User | null;
}