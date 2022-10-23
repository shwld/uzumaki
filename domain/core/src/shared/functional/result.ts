import * as E from 'fp-ts/Either';
import { Lazy } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { Match } from 'ts-pattern/dist/types/Match';
import type { ApplicationError } from '../error';
import { patternMatch } from './function';
import { pipe as doPipe, flow } from 'fp-ts/lib/function';

export const pipe = doPipe;
export type Result<E, A> = E.Either<E, A>;
export type AsyncResult<E, A> = TE.TaskEither<E, A>;

export const Result = {
  left: E.left,
  right: E.right,
};

export const toAsync = TE.fromEither;
export const tryCatch: <E, A>(
  f: Lazy<Promise<A>>,
  onRejected: (reason: unknown) => E
) => AsyncResult<E, A> = (f, onRejected) => {
  return TE.tryCatch(f, onRejected);
};
export const mapAsync = TE.map;
// export const handleErrorAsync =
//   <T>(f: (ma: Match<ApplicationError, T>) => T) =>
//   <U>(arg: U): AsyncResult<T, U> => {
//     return doPipe(arg, patternMatch, TE.mapLeft(f));
//   };
export const handleErrorAsync = TE.mapLeft;
export const andThen = TE.chainW;
export const orElse = TE.mapLeft;
export const resolveAsync = <E, A>(asyncResult: AsyncResult<E, A>) =>
  asyncResult().then(result => {
    if (E.isLeft(result)) {
      return result.left;
    }
    return result.right;
  });
