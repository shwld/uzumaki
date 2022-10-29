import * as E from 'fp-ts/Either';
import { Lazy } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { pipe as doPipe, flow } from 'fp-ts/lib/function';

export const pipe = doPipe;
export type Result<E, A> = TE.TaskEither<E, A>;
export type Either<E, A> = E.Either<E, A>;
export const Either = E;

export const Result = {
  left: E.left,
  right: E.right,
};

export const toResult = TE.fromEither;
export const makeResult = <E, A, TArgs>(
  f: (args: TArgs) => E.Either<E, A>
): ((args: TArgs) => Result<E, A>) => flow(f, TE.fromEither);
export const tryCatch: <E, A>(
  f: Lazy<Promise<A>>,
  onRejected: (reason: unknown) => E
) => Result<E, A> = (f, onRejected) => {
  return TE.tryCatch(f, onRejected);
};
export const map = TE.map;
export const mapLeft = TE.mapLeft;
export const andThen = TE.chainW;
export const orElse = TE.mapLeft;
export const resolve = <E, A>(asyncResult: Result<E, A>) =>
  asyncResult().then(result => {
    if (E.isLeft(result)) {
      return result.left;
    }
    return result.right;
  });
