import {User} from "../User"
import {Payment} from "../Payment"
import type {PaymentStatus} from "../../types/PaymentStatus.ts";

export class PaymentService {
    //symulacja płatności
    async PayForReservation(price: number, user: User): Promise<boolean> {
    console.log(`Przetwarzanie płatności dla ${user.username} na kwotę ${price} PLN `)
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Płatność zaakceptowana");
    return true;
}
    async CancelPayment(payment: Payment): Promise<boolean> {
        console.log(`Aunulowanie płatności ${payment.id}`);
    }
    async updatePaymentStatus(payment: Payment, status: PaymentStatus): Promise<boolean> {
        console.log(`Aktualizacja status płatności ${payment.id} na status ${status}`);
        return true;
    }
}
