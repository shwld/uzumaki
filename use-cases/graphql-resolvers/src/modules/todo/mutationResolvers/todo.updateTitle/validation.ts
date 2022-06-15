import { todoValidationSchema } from 'core-domain';
import { z } from 'zod';

export const updateTodoTitleArgsValidationSchema = z.object({
  input: todoValidationSchema.pick({
    id: true,
    title: true,
  }),
});
