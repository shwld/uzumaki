import {
  MutationResolvers,
  ResolversParentTypes,
} from '../../generated/resolversTypes';
import type { ZodObject } from 'zod';
import { createResolver, ParamsType, ResolverFnType } from './resolverHelpers';

type MutationResolver<T extends keyof MutationResolvers> = Extract<
  MutationResolvers[T],
  Function
>;

type ArgType<T extends keyof MutationResolvers> = Parameters<
  MutationResolver<T>
>;

type MutationReturnType<T extends keyof MutationResolvers> = ReturnType<
  MutationResolver<T>
>;

type Parent = ResolversParentTypes['Mutation'];

export const createMutationResolver = <
  TName extends keyof MutationResolvers,
  TZodSchema extends ZodObject<{}>,
  TAuthorizedObject
>(
  _mutationName: TName,
  params: ParamsType<Parent, ArgType<TName>, TZodSchema, TAuthorizedObject>,
  resolveFn: ResolverFnType<
    Parent,
    ArgType<TName>,
    TAuthorizedObject,
    MutationReturnType<TName>
  >
): MutationResolver<TName> => {
  const res = createResolver<
    MutationReturnType<TName>,
    ResolversParentTypes['Mutation'],
    ArgType<TName>,
    TZodSchema,
    TAuthorizedObject
  >(params, resolveFn);

  return res as MutationResolver<TName>;
};
