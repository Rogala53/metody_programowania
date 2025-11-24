import type {PaymentStatus} from "../../types/PaymentStatus.ts";
import type {IPaymentService} from "../../interfaces/IPaymentService.ts";
import type {IPayment} from "../../interfaces/IPayment.ts";
import type {IReservation} from "../../interfaces/IReservation.ts";
import {Payment} from "../Payment.ts";
import {DataNotFoundError} from "../../exceptions/DataNotFoundError.ts";

export class PaymentService implements IPaymentService {
    payments: IPayment[] = [];

    constructor() {
    }


    //symulacja płatności
    async payForReservation(reservation: IReservation, price: number): Promise<boolean> {
        console.log(`Przetwarzanie płatności dla ${reservation.user.username} na kwotę ${price} PLN `)
        let payment: IPayment = new Payment(reservation.paymentId, reservation.user.id, reservation.flightId, "pending");
        this.payments.push(payment);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Płatność zaakceptowana");
        payment.status = "accepted";
        return true;
    }

    async cancelPayment(payment: IPayment): Promise<boolean> {
        console.log(`Aunulowanie płatności ${payment.id}`);
        return true;
    }

    async updatePaymentStatus(payment: IPayment, status: PaymentStatus): Promise<boolean> {
        payment.status = status;
        console.log(`Aktualizacja status płatności ${payment.id} na status ${status}`);
        return true;
    }

    async refundPayment(payment: IPayment | undefined): Promise<boolean> {
        console.log(`Zwrot na konto przypisane do ${payment.userId}`)
        payment.status = "refunded";
        return true;
    }

    async findPayment(id: number): Promise<IPayment> {
        const payment: IPayment | undefined = this.payments.find(p => p.id === id);
        if(payment == undefined) {
            throw new DataNotFoundError("Nie znaleziono płatności");
        }
        else {
            return payment;
        }
    }
}
