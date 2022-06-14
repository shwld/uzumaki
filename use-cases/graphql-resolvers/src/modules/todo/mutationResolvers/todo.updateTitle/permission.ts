import { isAuthenticated } from '../../../../shared/rules/isAuthenticated';

export const todoUpdateMutationPermission = {
  createTodo: isAuthenticated,
};
