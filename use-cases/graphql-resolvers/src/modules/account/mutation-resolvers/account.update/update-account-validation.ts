import { AccountValidator } from 'core-domain';
import { z } from 'zod';

export const updateAccountArgsValidationSchema = z.object({
  input: AccountValidator.schema.pick({
    id: true,
    name: true,
  }),
});
