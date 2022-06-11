import { isAuthenticated } from './shared/rules/isAuthenticated';

export const defaultPermission = {
  Query: {
    '*': isAuthenticated,
  },
  Mutation: {
    '*': isAuthenticated,
  },
};
