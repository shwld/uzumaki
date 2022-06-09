import { rule } from 'graphql-shield';
import { RuleFunction } from '../types';

const isAuthenticatedRule: RuleFunction = async (
  _parent,
  _args,
  ctx,
  _info
) => {
  return ctx.currentUser != null;
};
export const isAuthenticated = rule()(isAuthenticatedRule);
