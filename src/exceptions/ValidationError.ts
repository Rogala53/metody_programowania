import {AppError} from "./AppError.ts";

export class ValidationError extends AppError {
    constructor(message: string, originalError?: any) {
        super(message, originalError);
    }
}