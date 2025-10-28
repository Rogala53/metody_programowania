import type { IPayment } from "../interfaces/IPayment"
import type {PaymentStatus} from "../types/PaymentStatus.ts";

class Payment implements IPayment {
    public id: number;
    public userId: number;
    public flightId: number;
    public status: PaymentStatus;
    constructor(id:number, userId: number, flightId: number, status: PaymentStatus) {
        this.id = id;
        this.userId = userId;
        this.flightId = flightId;
        this.status = status;
    }


}