import * as E from 'fp-ts/Either';
import { Lazy } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { flow } from './function';

export type Result<E, A> = TE.TaskEither<E, A>;
export type Either<E, A> = E.Either<E, A>;
export const Either = E;

export const Result = {
  left: TE.left,
  right: TE.right,
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
export const tap =
  <L, R>(f: (right: R) => void) =>
  (e: Result<L, R>): Result<L, R> => {
    return async () => {
      const result = await e();
      if (Either.isRight(result)) {
        await f(result.right);
      }

      return result;
    };
  };
export const mapLeft = TE.mapLeft;
export const andThen = TE.chainW;
export const orElse = TE.mapLeft;
export const resolve = <E, A>(asyncResult: Result<E, A>): Promise<E | A> =>
  asyncResult().then(result => {
    if (E.isLeft(result)) {
      return result.left;
    }
    return result.right;
  });
export const sequenceResults = <A, E>(
  arr: readonly Result<E, A>[]
): Result<E, readonly A[]> => TE.sequenceArray(arr);
export const flatten = TE.flattenW;

export const getOrThrow = async <L, R>(e: Result<L, R>): Promise<R> => {
  const result = await e();
  if (Either.isLeft(result)) {
    throw result.left;
  }
  return result.right;
};
