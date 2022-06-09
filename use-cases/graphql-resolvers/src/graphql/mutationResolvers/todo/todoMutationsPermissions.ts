import { todoValidationSchema } from 'core-domain';
import { and, rule } from 'graphql-shield';
import { MutationCreateTodoArgs } from '../../generated/resolversTypes';
import { isAuthenticated } from '../../shared/rules/isAuthenticated';
import { RuleFunction } from '../../shared/types';

export const createTodoArgsValidationSchema = todoValidationSchema.pick({
  id: true,
  title: true,
});

const isValidCreateTodoArgs: RuleFunction<MutationCreateTodoArgs> = (
  _parent,
  args
) => {
  const { success } = createTodoArgsValidationSchema.safeParse(args.input);
  return success;
};

export const todoMutationsPermissions = {
  createTodo: and(isAuthenticated, rule()(isValidCreateTodoArgs)),
};
