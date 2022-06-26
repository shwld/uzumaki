import { GraphQLResolveInfo } from 'graphql';
import { rule } from 'graphql-shield';
import { GraphqlServerContext } from '../../../context';

export type RuleFunction<
  TArguments extends {} = {},
  TParent extends {} = {}
> = (
  parent: TParent,
  args: TArguments,
  ctx: GraphqlServerContext,
  _info: GraphQLResolveInfo
) => Promise<boolean> | boolean;

export function createRule<TArguments extends {} = {}, TParent extends {} = {}>(
  ruleFn: RuleFunction<TArguments, TParent>
) {
  return rule()(ruleFn);
}
