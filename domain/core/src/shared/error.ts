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

type PrismaError = Error & {
  clientVersion?: string;
  code?: string;
  meta?: any;
};
export class RuntimeError<T extends PrismaError = PrismaError> extends Error {
  _tag = 'RuntimeError' as const;
  name = 'RuntimeError';
  originalName?: string;
  clientVersion?: string;
  code?: string;
  meta?: any;
  constructor(public arg: string | T) {
    let message: string;
    if (arg instanceof Error) {
      message = arg.message;
    } else {
      message = arg;
    }
    super(message);

    if (arg instanceof Error) {
      this.stack = arg.stack;
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RuntimeError);
    }

    if (arg instanceof Error) {
      // take over prisma's error properties
      this.clientVersion = arg.clientVersion;
      this.originalName = arg.name;
      this.code = arg.code;
      this.meta = arg.meta;
    }

    this.name = 'RuntimeError';
    this._tag = 'RuntimeError';
  }
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

  static from<T extends Error>(e: T): NotAuthorizedError {
    return new NotAuthorizedError(e.message);
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

export class RequiredArgumentError extends Error {
  _tag = 'RequiredArgumentError' as const;
  name = 'RequiredArgumentError';
  constructor(...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredArgumentError);
    }

    // Custom debugging information
  }
}

export type ApplicationError =
  | InvalidAttributesError
  | RuntimeError
  | NotAuthorizedError
  | RequiredArgumentError
  | RecordNotFoundError;
