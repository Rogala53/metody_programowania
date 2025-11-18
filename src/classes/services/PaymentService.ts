import {User} from "../User"
import {Payment} from "../Payment"
import type {PaymentStatus} from "../../types/PaymentStatus.ts";

export class PaymentService {
    payments: Payment[] = [];

    constructor(payments: Payment[]) {
        this.payments = payments;
    }
    //symulacja płatności
    async payForReservation(price: number, user: User): Promise<boolean> {
        console.log(`Przetwarzanie płatności dla ${user.username} na kwotę ${price} PLN `)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Płatność zaakceptowana");
        return true;
    }

    async cancelPayment(payment: Payment): Promise<boolean> {
        console.log(`Aunulowanie płatności ${payment.id}`);
        return true;
    }

    async updatePaymentStatus(payment: Payment, status: PaymentStatus): Promise<boolean> {
        console.log(`Aktualizacja status płatności ${payment.id} na status ${status}`);
        return true;
    }

    async refundPayment(payment: Payment): Promise<boolean> {

        console.log(`Zwrot na konto przypisane do ${payment.userId}`)
        payment.status = "refunded";
        return true;
    }
}
