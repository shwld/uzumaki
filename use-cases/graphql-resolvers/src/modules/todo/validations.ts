import { createTodoArgsValidationSchema } from './mutationResolvers/todo.create/validation';
import { updateTodoTitleArgsValidationSchema } from './mutationResolvers/todo.updateTitle/validation';

export const todoValidationSchemas = {
  createTodo: createTodoArgsValidationSchema,
  updateTodoTitle: updateTodoTitleArgsValidationSchema,
};
