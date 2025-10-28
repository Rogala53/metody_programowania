import type { PaymentStatus } from "../types/PaymentStatus"
export interface IPayment {
    id: number;
    userId: number;
    flightId: number;
    status: PaymentStatus;
}