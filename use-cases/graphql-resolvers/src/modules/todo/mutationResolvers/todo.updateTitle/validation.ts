import { todoValidationSchema } from 'core-domain';
import { z } from 'zod';

export const updateTodoTitleInputArgsValidationSchema =
  todoValidationSchema.pick({
    id: true,
    title: true,
  });
export const updateTodoTitleArgsValidationSchema = z.object({
  input: updateTodoTitleInputArgsValidationSchema,
});
