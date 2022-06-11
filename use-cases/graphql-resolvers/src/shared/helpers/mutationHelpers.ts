import {
  InvalidArgumentsResult,
  MutationResolvers,
  UnauthenticatedResult,
} from '../../generated/resolversTypes';
import type { ZodObject, ZodError } from 'zod';

export type MutationResult<T> = { result: T };

export function mutationResult<T>(result: T): MutationResult<T> {
  return { result };
}

export function unauthenticatedResult(): UnauthenticatedResult {
  return {
    errorMessage: 'Unauthenticated',
  };
}

export function invalidArgumentsResult(
  zodError: ZodError
): InvalidArgumentsResult {
  return {
    issues: zodError.issues.map((it) => ({
      field: it.path[0].toString(),
      message: it.message,
    })),
  };
}

type MutationFunction<T extends keyof MutationResolvers> = Extract<
  MutationResolvers[T],
  Function
>;

export const createMutationFn = <
  T extends keyof MutationResolvers,
  U extends ZodObject<{}>
>(
  _mutationName: T,
  params: {
    validationSchema: U;
    requireAuth?: boolean;
  },
  resolveFn: MutationFunction<T>
): MutationFunction<T> => {
  type ArgType = Parameters<MutationFunction<T>>;
  const resolve = (
    parent: ArgType[0],
    args: ArgType[1],
    ctx: ArgType[2],
    info: ArgType[3]
  ) => {
    const requireAuth = params.requireAuth ?? true;
    if (requireAuth && ctx.currentUser === null) {
      return unauthenticatedResult();
    }
    const validationResult = params.validationSchema.safeParse(args);
    if (!validationResult.success) {
      return invalidArgumentsResult(validationResult.error);
    }

    const result = resolveFn(parent, args, ctx, info);
    return result;
  };

  // FIXME: Remove type cast
  return resolve as MutationFunction<T>;
};
