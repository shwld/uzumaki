import { ZodError } from 'zod';

interface BaseError {
  message(): string;
}

export class InvalidAttributesError implements BaseError {
  private _zodError: ZodError;
  constructor(zodError: ZodError) {
    this._zodError = zodError;
  }

  message(): string {
    return `Validation Error: ${this._zodError.message}`;
  }

  static from(zodError: ZodError) {
    return new InvalidAttributesError(zodError);
  }

  static empty() {
    const zodError = new ZodError([]);
    return new InvalidAttributesError(zodError);
  }
}
