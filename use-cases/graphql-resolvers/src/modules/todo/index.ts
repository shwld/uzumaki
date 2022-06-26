import { GraphqlServerContext } from '../../context';
import { Resolvers } from '../../generated/resolversTypes';
import * as todoMutationResolvers from './mutationResolvers/todo.create';
import { todoResolver } from './objectResolvers/todo/todoResolver';

const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {},
  Mutation: {
    ...todoMutationResolvers,
  },
  Todo: todoResolver,
};

export const todoModule = {
  resolvers,
};
