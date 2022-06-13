class CustomErrorBase extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class RecordNotFoundError extends CustomErrorBase {}

export function assertRecordPresent<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new RecordNotFoundError();
  }
}
