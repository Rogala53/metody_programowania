import {AppError} from "./AppError.ts";

export class InfrastructureError extends AppError {
    constructor(message: string, originalError?: Error) {
        super(message, originalError);
    }
}