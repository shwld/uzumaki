import { isAuthenticated } from '../../shared/rules/isAuthenticated';

export const todoCreateMutationPermission = {
  createTodo: isAuthenticated,
};
