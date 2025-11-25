import type { IPayment } from "./IPayment.ts";
import type {IReservation} from "./IReservation.ts";

export interface IPaymentService {
    payForReservation(reservation: IReservation, price: number): Promise<void>;

    refundPayment(payment: IPayment | undefined): Promise<void>;
    cancelPayment(payment: IPayment): Promise<void>;
    findPayment(paymentId: number): Promise<IPayment>;
}