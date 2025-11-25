import type {PaymentStatus} from "../../types/PaymentStatus.ts";
import type {IPaymentService} from "../../interfaces/IPaymentService.ts";
import type {IPayment} from "../../interfaces/IPayment.ts";
import type {IReservation} from "../../interfaces/IReservation.ts";
import {Payment} from "../Payment.ts";
import { Logger } from "../Logger.ts";
import {DomainError} from "../../exceptions/DomainError.ts";
import {InfrastructureError} from "../../exceptions/InfrastructureError.ts";

export class PaymentService implements IPaymentService {
    payments: IPayment[] = [];

    constructor() {
    }


    //symulacja płatności
    async payForReservation(reservation: IReservation, price: number): Promise<void> {
        Logger.info(`Przetwarzanie płatności dla ${reservation.user.username} na kwotę ${price} PLN `)
        try {
            const payment: IPayment = new Payment(
                reservation.paymentId,
                reservation.user.id,
                reservation.flightId,
                "pending");
            this.payments.push(payment);

            //przetwarzanie płatności przez bramkę płatności
            await new Promise(resolve => setTimeout(resolve, 1000));

            payment.status = "accepted";

            Logger.info(`Płatność dla rezerwacji ${reservation.id} zakończona sukcesem`);
        } catch (error) {
            throw new InfrastructureError(`Krytyczny błąd bramki płatności dla rezerwacji ${reservation.id}`, error);
        }


    }

    async cancelPayment(payment: IPayment): Promise<void> {
        Logger.info(`Ropoczęcie anulowania płatności ${payment.id}`);
        try {
            //przesyłanie potrzebnych informacji o płatności do bramki, która anuluje płatność
            payment.status = "cancelled";

            Logger.info(`Anulowanie płatności ${payment.id} powiodło się`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Nie udało się anulować płatności ${payment.id}`, error);
        }
    }

    async updatePaymentStatus(payment: IPayment, status: PaymentStatus): Promise<void> {
        Logger.info(`Aktualizacja statusu płatności ${payment.id}`);
        try {
            payment.status = status;
        } catch (error) {
            throw new InfrastructureError(`Błąd aktualizacji statusu płatności ${payment.id}`, error);
        }

    }

    async refundPayment(payment: IPayment): Promise<void> {
        Logger.info(`Rozpoczęcie zwrotu na konto przypisane do ${payment.userId}`);
        try {
            if(payment.status !== "accepted") {
                throw new DomainError("Można zwrócić jedynie zaakceptowane płatności");
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            // zwracanie pieniędzy na konto przez bramkę platności
            payment.status = "refunded";
            Logger.info(`Zwrot środków dla płatności ${payment.id} został wykonany pomyślnie`);
        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Krytyczny błąd podczas zwracania płatności ${payment.id} na konto ${payment.userId}`, error);
        }
    }

    async findPayment(id: number): Promise<IPayment> {
        Logger.info(`Wyszukiwanie płatności ${id}`);
        try {
            const payment= this.payments.find(p => p.id === id);
            if(!payment) {
                throw new DomainError(`Nie znaleziono płatności o id ${id}`);
            }

            return payment;

        } catch (error) {
            if (error instanceof DomainError) throw error;

            throw new InfrastructureError(`Błąd odczytu płatności ${id}`, error);
        }
    }
}
