import { todoValidationSchema } from 'core-domain';
import { z } from 'zod';

export const createTodoInputArgsValidationSchema = todoValidationSchema.pick({
  id: true,
  title: true,
});
export const createTodoArgsValidationSchema = z.object({
  input: createTodoInputArgsValidationSchema,
});
