export class AppError extends Error {
    constructor(message: string, originalError?: AppError) {
        super(message, originalError);
    }
}