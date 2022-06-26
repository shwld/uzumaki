import type { GraphQLResolveInfo } from 'graphql';
import type { ZodError, ZodObject } from 'zod';
import type { GraphqlServerContext } from '../../context';
import type {
  InvalidArgumentsResult,
  ResolverFn,
  UnauthorizedResult,
} from '../../generated/resolversTypes';

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
    issues: zodError.issues.map((it) => ({
      field: it.path[0].toString(),
      message: it.message,
    })),
  };
}

export function isAuthorized<T>(result: boolean | T): result is NonNullable<T> {
  if (typeof result === 'boolean') {
    return result;
  } else if (result == null) {
    return false;
  }
  return true;
}

type ResolverConfig<TParent, TArgs, TContext, TInfo> = {
  parent: TParent;
  args: TArgs;
  context: TContext;
  info: TInfo;
};

type Info = GraphQLResolveInfo;
type Context = GraphqlServerContext;

export type ParamsType<
  TParent,
  TArgs,
  TSchema extends ZodObject<{}>,
  TAuthorizedObject
> = {
  validationSchema: TSchema;
  authorize?(
    args: ResolverConfig<TParent, TArgs, Context, Info>
  ): Promise<boolean | TAuthorizedObject> | boolean | TAuthorizedObject;
};

export type ResolverFnType<TParent, TArgs, TAuthorizedObject, TResult> = (
  args: ResolverConfig<TParent, TArgs, Context, Info>,
  obj: NonNullable<TAuthorizedObject>
) => TResult;

export const createResolver = <
  TResult,
  TParent,
  TArgs,
  TSchema extends ZodObject<{}>,
  TAuthorizedObject
>(
  params: ParamsType<TParent, TArgs, TSchema, TAuthorizedObject>,
  resolveFn: ResolverFnType<TParent, TArgs, TAuthorizedObject, TResult>
) => {
  const resolve = async (
    parent: TParent,
    args: TArgs,
    context: Context,
    info: Info
  ) => {
    const passingArgs = { parent, args, context, info };

    const authorizeResult =
      params.authorize == null ? true : await params.authorize(passingArgs);
    if (!isAuthorized(authorizeResult)) {
      return unauthorizedResult();
    }

    const validationResult = params.validationSchema.safeParse(args);
    if (!validationResult.success) {
      return invalidArgumentsResult(validationResult.error);
    }

    const result = resolveFn(passingArgs, authorizeResult);
    return result;
  };

  // FIXME: Remove type cast
  return resolve;
};

type Rn<TResult, TParent, TArgs> = ResolverFn<TResult, TParent, Context, TArgs>;

type Fn<TResult, TParent, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

const rn: Rn<{}, {}, {}> = () => ({});
const fn: Fn<{}, {}, {}> = rn;
