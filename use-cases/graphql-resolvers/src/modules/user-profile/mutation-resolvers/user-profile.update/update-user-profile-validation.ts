import { UserProfileValidator } from 'core-domain';
import { z } from 'zod';

export const updateUserProfileArgsValidationSchema = z.object({
  input: z.object({
    name: UserProfileValidator.validators.name.optional(),
    avatarImageUrl: UserProfileValidator.validators.avatarImageUrl.optional(),
  }),
});
