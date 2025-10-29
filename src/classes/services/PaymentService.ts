import {User} from "../User"
import {Payment} from "../Payment"
import type {PaymentStatus} from "../../types/PaymentStatus.ts";

export class PaymentService {
    PayForReservation(price: number, user: User): boolean;
    CancelPayment(payment: Payment): boolean;
    updatePaymentStatus(payment: Payment, status: PaymentStatus): boolean;
}
