class PaymentService {
    PayForReservation(price: number, user: User): boolean;
    CancelPayment(payment: Payment): boolean;
    updatePaymentStatus(payment: Payment, status: PaymentStatus): boolean;
}
