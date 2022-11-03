import { RequiredArgumentError } from './error';
import { Result } from './result';

type RequiredObject<T extends object> = { [P in keyof T]: NonNullable<T[P]> };

export const requireObjectArgument = <
  T extends { [P in keyof T]?: T[P] | undefined | null }
>(
  input: T
): Result<RequiredArgumentError, RequiredObject<T>> => {
  if (!everyRequiredArgument(input)) {
    return Result.left(new RequiredArgumentError());
  }

  return Result.right(input);
};

export const requireObjectArgumentOrThrow = <
  T extends { [P in keyof T]?: T[P] | undefined | null }
>(
  input: T
): RequiredObject<T> => {
  if (!everyRequiredArgument(input)) {
    throw new RequiredArgumentError();
  }

  return input;
};

export function everyRequiredArgument<
  T extends { [P in keyof T]?: T[P] | undefined | null }
>(input: T): input is RequiredObject<T> {
  return Object.values(input).every(it => it != null);
}
