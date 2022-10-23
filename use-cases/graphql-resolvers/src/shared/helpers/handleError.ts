import {
  ApplicationError,
  InvalidAttributesError,
  mapLeft,
  patternMatch,
  pipe,
  Result,
} from 'core-domain';
import {
  InternalErrorResult,
  InvalidArgumentsResult,
  UnauthorizedResult,
} from '../../generated/resolversTypes';

export const handleError = <A>(
  result: Result<ApplicationError | ErrorResult, A>
): Result<ErrorResult, A> => {
  const r = pipe(
    result,
    mapLeft(v =>
      patternMatch(v)
        .with({ _tag: 'InvalidAttributesError' }, invalidArgumentsResult)
        .with({ _tag: 'RecordNotFoundError' }, unauthorizedErrorResult)
        .with({ _tag: 'NotAuthorizedError' }, unauthorizedErrorResult)
        .with({ _tag: 'RepositoryRuntimeError' }, internalErrorResult)
        .with({ __typename: 'InvalidArgumentsResult' }, e => e)
        .with({ __typename: 'UnauthorizedResult' }, e => e)
        .with({ __typename: 'InternalErrorResult' }, e => e)
        .with({ __typename: undefined }, e =>
          internalErrorResult({ message: e.errorMessage })
        )
        .exhaustive()
    )
  );

  return r;
};

type ErrorResult =
  | InvalidArgumentsResult
  | UnauthorizedResult
  | InternalErrorResult;

function invalidArgumentsResult(
  invalidError: InvalidAttributesError
): InvalidArgumentsResult {
  return {
    __typename: 'InvalidArgumentsResult',
    issues: invalidError.issues,
    errorMessage: 'invalid',
  };
}

function unauthorizedErrorResult<E extends Error>(e: E): UnauthorizedResult {
  return {
    __typename: 'UnauthorizedResult',
    errorMessage: e.message,
  };
}

function internalErrorResult<E extends { message: string }>(
  e: E
): InternalErrorResult {
  return {
    __typename: 'InternalErrorResult',
    errorMessage: e.message,
  };
}
