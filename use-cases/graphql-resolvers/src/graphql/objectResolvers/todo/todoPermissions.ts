import { TodoEntity, todoValidationSchema } from 'core-domain';
import { and, rule } from 'graphql-shield';
import { MutationCreateTodoArgs } from '../../generated/resolversTypes';
import { isAuthenticated } from '../../shared/rules/isAuthenticated';
import { RuleFunction } from '../../shared/types';

const isOwned: RuleFunction<{}, TodoEntity> = (parent, _args, ctx) => {
  return parent.userId === ctx.currentUser?.id;
};

export const todoPermission = {
  Todo: and(isAuthenticated, rule()(isOwned)),
};
