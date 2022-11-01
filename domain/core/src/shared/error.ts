import { ZodError } from 'zod';

type Issue = { field?: string; message: string };
export class InvalidAttributesError extends Error {
  _tag = 'InvalidAttributesError' as const;
  name = 'InvalidAttributesError';
  constructor(public issues: Issue[], public message: string, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidAttributesError);
    }

    // Custom debugging information
  }

  static from(zodError: ZodError) {
    return new InvalidAttributesError(
      zodError.issues,
      `Validation Error: ${zodError.message}`
    );
  }

  static customError(issues: Issue[]) {
    return new InvalidAttributesError(
      issues,
      `Validation Error: ${issues.map(it => it.message).join('\n')}`
    );
  }

  static empty() {
    const zodError = new ZodError([]);
    return new InvalidAttributesError([], `Validation Error`);
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

export class NotAuthorizedError extends Error {
  _tag = 'NotAuthorizedError' as const;
  name = 'NotAuthorizedError';
  constructor(public message: string, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotAuthorizedError);
    }

    // Custom debugging information
  }
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
  | NotAuthorizedError
  | RecordNotFoundError;
