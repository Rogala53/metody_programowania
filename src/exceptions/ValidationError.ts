import {AppError} from "./AppError.ts";

export class ValidationError extends AppError {
    constructor(message: string, originalError?: AppError) {
        super(message, originalError);
    }
}