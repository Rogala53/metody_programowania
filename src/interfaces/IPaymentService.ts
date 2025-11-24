import type { IPayment } from "./IPayment.ts";
import type {IReservation} from "./IReservation.ts";

export interface IPaymentService {
    payForReservation(reservation: IReservation, price: number): Promise<boolean>;

    refundPayment(payment: IPayment | undefined): Promise<boolean>;
    cancelPayment(payment: IPayment): Promise<boolean>;
    findPayment(paymentId: number): Promise<IPayment | undefined>;
}