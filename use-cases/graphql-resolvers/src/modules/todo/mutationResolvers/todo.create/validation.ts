import { todoValidationSchema } from 'core-domain';
import { z } from 'zod';

export const createTodoArgsValidationSchema = z.object({
  input: todoValidationSchema.pick({
    id: true,
    title: true,
  }),
});
