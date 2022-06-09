import { todoValidationSchema } from 'core-domain';
import { and, rule } from 'graphql-shield';
import { MutationCreateTodoArgs } from '../../generated/resolversTypes';
import { isAuthenticated } from '../../rules/isAuthenticated';
import { RuleFunction } from '../../rules/types';

export const createTodoArgsValidationSchema = todoValidationSchema.pick({
  id: true,
  title: true,
});

const isValidCreateTodoArgs: RuleFunction<MutationCreateTodoArgs> = (
  _parent,
  args,
  _ctx,
  _info
) => {
  const { success } = createTodoArgsValidationSchema.safeParse(args.input);
  return success;
};

export const todoMutationPermissions = {
  createTodo: and(isAuthenticated, rule()(isValidCreateTodoArgs)),
};
