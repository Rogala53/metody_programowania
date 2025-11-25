export class AppError extends Error {
    // @ts-ignore
    constructor(message: string, public readonly originalError?: any) {
        super(message);
    }
}