import { rule } from 'graphql-shield';
import { RuleFunction } from '../types';

const isAuthenticatedFn: RuleFunction = async (_parent, _args, ctx, _info) => {
  return ctx.currentUser != null;
};
export const isAuthenticated = rule()(isAuthenticatedFn);
