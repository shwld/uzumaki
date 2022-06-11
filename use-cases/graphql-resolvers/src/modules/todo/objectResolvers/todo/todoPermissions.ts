import { TodoEntity } from 'core-domain';
import { and, rule } from 'graphql-shield';
import { isAuthenticated } from '../../../../shared/rules/isAuthenticated';
import { RuleFunction } from '../../../../shared/types';

const isOwned: RuleFunction<{}, TodoEntity> = (parent, _args, ctx) => {
  return parent.userId === ctx.currentUser?.id;
};

export const todoPermission = {
  Todo: and(isAuthenticated, rule()(isOwned)),
};
