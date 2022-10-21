export * as E from 'fp-ts/Either';
export * as TE from 'fp-ts/TaskEither';
export { pipe } from 'fp-ts/lib/function';

import { tryCatch } from 'fp-ts/TaskEither';

export const promiseToEither = tryCatch;

export type Result<E extends Promise<unknown>, S extends Promise<unknown>> =
  | Error<E>
  | Success<S>;

export class Error<E> {
  __tag = 'Error' as const;
  constructor(private readonly _value: Promise<E>) {}
  public get value() {
    return this._value;
  }

  static of<T>(value: Promise<T>): Error<T> {
    return new Error(value);
  }

  andThen<T extends Promise<unknown>>(_f: () => Error<T>) {
    return this;
  }

  orElse(f: (v: E) => Promise<E>): Promise<Error<E>> {
    return this._value.then(v => Error.of(f(v)));
  }

  get isError() {
    return true;
  }

  get isRight() {
    return false;
  }
}

export class Success<R extends Promise<unknown>> {
  __tag = 'Success' as const;
  constructor(private readonly _value: R) {}
  public get value() {
    return this._value;
  }

  static of<T extends Promise<unknown>>(value: T): Success<T> {
    return new Success(value);
  }

  andThen(f: (v: R) => R): Success<R> {
    return Success.of(f(this._value));
  }

  orElse<T extends Promise<unknown>>(_f: () => Success<T>) {
    return this;
  }

  get isError() {
    return false;
  }

  get isRight() {
    return true;
  }
}
