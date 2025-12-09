import {AppError} from "./AppError.ts";

export class DomainError extends AppError {
    constructor(message: string, originalError?: AppError) {
        super(message, originalError);
    }
}