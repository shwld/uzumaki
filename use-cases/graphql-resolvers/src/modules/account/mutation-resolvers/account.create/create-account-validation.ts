import { AccountValidator } from 'core-domain';
import { z } from 'zod';

export const createAccountArgsValidationSchema = z.object({
  input: AccountValidator.schema.pick({
    id: true,
    name: true,
  }),
});
