import { todoValidationSchema } from 'core-domain';
import { and, rule } from 'graphql-shield';
import { GraphqlServerContext } from '../../context';
import { MutationCreateTodoArgs } from '../../generated/resolversTypes';
import { isAuthenticated } from '../../permissions/shared/rules';

export const createTodoArgsValidationSchema = todoValidationSchema.pick({
  id: true,
  title: true,
});

const isValidCreateTodoArgs = rule()(
  (
    _parent,
    args: MutationCreateTodoArgs,
    _ctx: GraphqlServerContext,
    _info
  ) => {
    const { success } = createTodoArgsValidationSchema.safeParse(args.input);
    return success;
  }
);

export const todoMutationPermissions = {
  createTodo: and(isAuthenticated, isValidCreateTodoArgs),
};
