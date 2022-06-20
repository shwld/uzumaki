import { match } from 'ts-pattern';
import {
  InvalidArgumentsResult,
  MutationResolvers,
  UnauthorizedResult,
} from '../../generated/resolversTypes';
import { ZodError } from 'zod';

type ResolverConfig<TParent, TArgs, TContext, TInfo> = {
  _tag: 'ResolverConfig';
  parent: TParent;
  args: TArgs;
  context: TContext;
  info: TInfo;
};

type PassingResult<TParent, TArgs, TContext, TInfo> = (
  | Result
  | ResolverConfig<TParent, TArgs, TContext, TInfo>
) &
  Taggable;
type Result = UnauthorizedResult | InvalidArgumentsResult;

export type Resolver<TParent, TArgs, TContext, TInfo, U> = (
  config: ResolverConfig<TParent, TArgs, TContext, TInfo>
) =>
  | Promise<PassingResult<TParent, TArgs, TContext, TInfo> | U>
  | PassingResult<TParent, TArgs, TContext, TInfo>
  | U;

type Taggable = {
  _tag: 'UnauthorizedResult' | 'InvalidArgumentsResult' | 'ResolverConfig';
};

export function unauthorizedResult(): Required<UnauthorizedResult> & Taggable {
  return {
    _tag: 'UnauthorizedResult',
    __typename: 'UnauthorizedResult',
    errorMessage: 'Unauthenticated',
  };
}

export function invalidArgumentsResult(
  zodError: ZodError
): Required<InvalidArgumentsResult> & Taggable {
  return {
    _tag: 'InvalidArgumentsResult',
    __typename: 'InvalidArgumentsResult',
    issues: zodError.issues.map((it) => ({
      field: it.path[0].toString(),
      message: it.message,
    })),
  };
}

const execute =
  <TParent, TArgs, TContext, TInfo, U extends Function>(
    resolve: U,
    reject = <W>(c: W) => c
  ) =>
  async (config: PassingResult<TParent, TArgs, TContext, TInfo>) => {
    const res = match(config)
      .with({ __typename: 'UnauthorizedResult' }, reject)
      .with({ __typename: 'InvalidArgumentsResult' }, reject)
      .otherwise((c) => resolve(c));
    return res;
  };

function getResolverConfig<TParent, TArgs, TContext, TInfo>(
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: TInfo
): PassingResult<TParent, TArgs, TContext, TInfo> {
  return {
    _tag: 'ResolverConfig',
    parent,
    args,
    context,
    info,
  };
}

type ResolverType<TParent, TArgs, TContext, TInfo, U> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: TInfo
) => Promise<U | Result>;

const createResolver = <TParent, TArgs, TContext, TInfo, U = Result>(
  ...resolvers: Resolver<TParent, TArgs, TContext, TInfo, U>[]
): ResolverType<TParent, TArgs, TContext, TInfo, U> => {
  const resolver = async (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: TInfo
  ): Promise<Result> => {
    const config = getResolverConfig(parent, args, context, info);
    const result = await resolvers.reduce(async (prev, resolve) => {
      return execute(resolve)(await prev);
    }, Promise.resolve(config));

    if (result?._tag === 'ResolverConfig') {
      throw new Error('ResolverConfig is not allowed');
    }
    return result as Result;
  };

  return resolver;
};

type MutationFunction<T extends keyof MutationResolvers> = Extract<
  MutationResolvers[T],
  Function
>;

export type MutationResolver<TName extends keyof MutationResolvers> = Resolver<
  Parameters<MutationFunction<TName>>[0],
  Parameters<MutationFunction<TName>>[1],
  Parameters<MutationFunction<TName>>[2],
  Parameters<MutationFunction<TName>>[3],
  ReturnType<MutationFunction<TName>>
>;

export const createMutationResolver = <TName extends keyof MutationResolvers>(
  _mutationName: TName,
  ...resolvers: MutationResolver<TName>[]
): MutationFunction<TName> => {
  const resolver = createResolver<
    Parameters<MutationFunction<TName>>[0],
    Parameters<MutationFunction<TName>>[1],
    Parameters<MutationFunction<TName>>[2],
    Parameters<MutationFunction<TName>>[3],
    ReturnType<MutationFunction<TName>>
  >(...resolvers);

  // FIXME: this is a hack to make the type checker happy
  return resolver as MutationFunction<TName>;
};
