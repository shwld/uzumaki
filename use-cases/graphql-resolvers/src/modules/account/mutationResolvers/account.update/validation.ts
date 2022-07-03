import { accountValidationSchema } from 'core-domain';
import { z } from 'zod';

export const updateAccountArgsValidationSchema = z.object({
  input: accountValidationSchema.pick({
    id: true,
    name: true,
  }),
});
