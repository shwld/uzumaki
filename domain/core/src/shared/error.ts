import { ZodError } from 'zod';

export class InvalidAttributesError extends Error {
  _tag = 'InvalidAttributesError' as const;
  name = 'InvalidAttributesError';
  private _zodError: ZodError;
  constructor(zodError: ZodError, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidAttributesError);
    }

    // Custom debugging information
    this._zodError = zodError;
  }

  get message(): string {
    return `Validation Error: ${this._zodError.message}`;
  }

  get issues(): Array<{ field?: string; message: string }> {
    return this._zodError.issues;
  }

  static from(zodError: ZodError) {
    return new InvalidAttributesError(zodError);
  }

  static empty() {
    const zodError = new ZodError([]);
    return new InvalidAttributesError(zodError);
  }
}

export class RepositoryRuntimeError extends Error {
  _tag = 'RepositoryRuntimeError' as const;
  name = 'RepositoryRuntimeError';
  originalName?: string;
  constructor(
    public message: string,
    public clientVersion?: string,
    ...params: any
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RepositoryRuntimeError);
    }

    // Custom debugging information
  }
  // get [Symbol.toStringTag](): string;
}

export class RecordNotFoundError extends Error {
  _tag = 'RecordNotFoundError' as const;
  name = 'RecordNotFoundError';
  constructor(...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RecordNotFoundError);
    }

    // Custom debugging information
  }
}

export type ApplicationError =
  | InvalidAttributesError
  | RepositoryRuntimeError
  | RecordNotFoundError;
