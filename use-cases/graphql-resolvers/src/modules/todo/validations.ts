import { createTodoArgsValidationSchema } from './mutationResolvers/todo.create/validation';

export const todoValidationSchemas = {
  createTodo: createTodoArgsValidationSchema,
};
