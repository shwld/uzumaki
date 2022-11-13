import { ProjectMemberValidator, UserValidator } from 'core-domain';
import { z } from 'zod';

export const inviteProjectMemberArgsValidationSchema = z
  .object({
    input: ProjectMemberValidator.schema
      .pick({
        id: true,
        projectId: true,
        role: true,
      })
      .merge(
        z.object({
          userEmail: UserValidator.validators.email,
        })
      ),
  })
  .strict();
