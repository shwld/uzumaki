import {
  InvalidArgumentsResult,
  MutationResolvers,
  UnauthenticatedResult,
} from '../../generated/resolversTypes';
import type { ZodObject, ZodError } from 'zod';

export function unauthenticatedResult(): UnauthenticatedResult {
  return {
    __typename: 'UnauthenticatedResult',
    errorMessage: 'Unauthenticated',
  };
}

export function invalidArgumentsResult(
  zodError: ZodError
): InvalidArgumentsResult {
  return {
    __typename: 'InvalidArgumentsResult',
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

type ArgType<T extends keyof MutationResolvers> = Parameters<
  MutationFunction<T>
>;
type PassingArgType<T extends keyof MutationResolvers> = {
  parent: ArgType<T>[0];
  args: ArgType<T>[1];
  context: ArgType<T>[2];
  info: ArgType<T>[3];
};

type MutationReturnType<T extends keyof MutationResolvers> = ReturnType<
  MutationFunction<T>
>;

export const createMutationFn = <
  TName extends keyof MutationResolvers,
  TSchema extends ZodObject<{}>,
  TAuthorizedObject
>(
  _mutationName: TName,
  params: {
    validationSchema: TSchema;
    authorize?(
      args: PassingArgType<TName>
    ):
      | Promise<boolean | [boolean, TAuthorizedObject]>
      | boolean
      | [boolean, TAuthorizedObject];
  },
  resolveFn: (
    args: PassingArgType<TName>,
    obj: TAuthorizedObject
  ) => MutationReturnType<TName>
): MutationFunction<TName> => {
  const resolve = async (
    parent: ArgType<TName>[0],
    args: ArgType<TName>[1],
    context: ArgType<TName>[2],
    info: ArgType<TName>[3]
  ) => {
    const passingArgs = { parent, args, context, info };

    // authorize
    const authorizeResult =
      params.authorize == null ? true : await params.authorize(passingArgs);
    let authorizedObject: TAuthorizedObject;
    if (typeof authorizeResult === 'boolean') {
      if (!authorizeResult) {
        return unauthenticatedResult();
      }
    } else if (!authorizeResult[0]) {
      return unauthenticatedResult();
    } else {
      authorizedObject = authorizeResult[1];
    }

    // validate
    const validationResult = params.validationSchema.safeParse(args);
    if (!validationResult.success) {
      return invalidArgumentsResult(validationResult.error);
    }

    // resolve
    const result = resolveFn(passingArgs, authorizedObject!);
    return result;
  };

  // FIXME: Remove type cast
  return resolve as MutationFunction<TName>;
};
