import { match } from 'ts-pattern';
import {
  InvalidArgumentsResult,
  UnauthorizedResult,
} from '../../generated/resolversTypes';
import { ZodError } from 'zod';

type BaseResolverFn = <TParent, TArgs, TCtx, TInfo, U>(
  parent: TParent,
  args: TArgs,
  ctx: TCtx,
  info: TInfo
) => U;
type BaseParameters = Parameters<BaseResolverFn>;
type ResolverConfig<T extends BaseParameters> = {
  parent: T[0];
  args: T[1];
  context: T[2];
  info: T[3];
};

type Result<T extends BaseParameters> =
  | Required<UnauthorizedResult>
  | Required<InvalidArgumentsResult>
  | ResolverConfig<T>
  | { result: any };

export type Resolver<T extends BaseParameters> = (
  config: ResolverConfig<T>
) => Promise<Result<T>> | Result<T>;

export function unauthorizedResult(): Required<UnauthorizedResult> {
  return {
    __typename: 'UnauthorizedResult',
    errorMessage: 'Unauthenticated',
  };
}

export function invalidArgumentsResult(
  zodError: ZodError
): Required<InvalidArgumentsResult> {
  return {
    __typename: 'InvalidArgumentsResult',
    issues: zodError.issues.map((it) => ({
      field: it.path[0].toString(),
      message: it.message,
    })),
  };
}

const execute =
  <T extends BaseParameters, U extends Function>(
    resolve: U,
    reject = <W>(c: W) => c
  ) =>
  async (config: Result<T>) => {
    const res = match(config)
      .with({ __typename: 'UnauthorizedResult' }, reject)
      .with({ __typename: 'InvalidArgumentsResult' }, reject)
      .otherwise((c) => resolve(c));
    return res;
  };

function getResolverConfig<T extends BaseParameters>(...args: T): Result<T> {
  return {
    parent: args[0],
    args: args[1],
    context: args[2],
    info: args[3],
  };
}

export const createResolver = <T extends BaseParameters, U = {}>(
  ...resolvers: Resolver<T>[]
) => {
  return async (...args: T) => {
    const config = getResolverConfig(...args);
    return await resolvers.reduce(async (prev, resolve) => {
      return execute(resolve)(await prev);
    }, Promise.resolve(config));
  };
};
