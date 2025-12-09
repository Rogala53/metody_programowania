import {ValidationError} from "../exceptions/ValidationError.ts";

export class Validator {
    static validatePositiveNumber(value: number, fieldName: string) {
        if (value <= 0) throw new ValidationError(`${fieldName} musi być liczbą dodatnią`);
    }

}