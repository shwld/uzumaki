import { accountValidationSchema } from 'core-domain';
import { z } from 'zod';

export const createAccountArgsValidationSchema = z.object({
  input: accountValidationSchema.pick({
    id: true,
    name: true,
  }),
});
