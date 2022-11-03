import { projectMemberValidationSchema, userValidator } from 'core-domain';
import { z } from 'zod';

export const inviteProjectMemberArgsValidationSchema = z.object({
  input: z
    .object({
      userEmail: userValidator.email,
    })
    .merge(
      projectMemberValidationSchema.pick({
        id: true,
        projectId: true,
        role: true,
      })
    ),
});
