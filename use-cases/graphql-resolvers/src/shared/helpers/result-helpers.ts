import {
  InvalidArgumentsResult,
  ResolversTypes,
  UnauthorizedResult,
} from '../../generated/resolvers-types';
import type { ZodError } from 'zod';

export function unauthorizedResult(): UnauthorizedResult {
  return {
    __typename: 'UnauthorizedResult',
    errorMessage: 'Unauthenticated',
  };
}

export function invalidArgumentsResult(
  zodError: ZodError
): InvalidArgumentsResult {
  return {
    __typename: 'InvalidArgumentsResult',
    issues: zodError.issues.map(it => ({
      field: it.path.join('/'),
      message: it.message,
    })),
    errorMessage: 'invalid',
  };
}

export const resolverReturnType =
  <TName extends keyof ResolversTypes, TArgs>(
    _name: TName,
    f: (args: TArgs) => Omit<ResolversTypes[TName], '__typename'>
  ) =>
  (args: TArgs) => {
    const result = f(args);
    return {
      __typename: _name,
      ...result,
    } as ResolversTypes[TName];
  };
