import {Payment} from "../Payment"
import type {PaymentStatus} from "../../types/PaymentStatus.ts";
import type {IPaymentService} from "../../interfaces/IPaymentService.ts";
import type {IUser} from "../../interfaces/IUser.ts";

export class PaymentService implements IPaymentService {
    payments: Payment[] = [];

    constructor(payments: Payment[]) {
        this.payments = payments;
    }


    //symulacja płatności
    async payForReservation(price: number, user: IUser): Promise<boolean> {
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
        payment.status = status;
        console.log(`Aktualizacja status płatności ${payment.id} na status ${status}`);
        return true;
    }

    async refundPayment(payment: Payment): Promise<boolean> {
        console.log(`Zwrot na konto przypisane do ${payment.userId}`)
        payment.status = "refunded";
        return true;
    }
}
