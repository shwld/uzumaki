import { rule } from 'graphql-shield';
import { GraphqlServerContext } from '../../context';

export const isAuthenticated = rule()(
  async (_parent, _args, ctx: GraphqlServerContext, _info) => {
    return ctx.currentUser != null;
  }
);
