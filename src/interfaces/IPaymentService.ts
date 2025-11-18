import type { IPayment } from "./IPayment.ts";
import type {IUser} from "./IUser.ts";

export interface IPaymentService {
    payForReservation(price: number, user: IUser): Promise<boolean>;
    refundPayment(payment: IPayment): Promise<boolean>;
    cancelPayment(payment: IPayment): Promise<boolean>;
}