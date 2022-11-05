import { ProjectMemberValidator } from 'core-domain';
import { z } from 'zod';

export const inviteProjectMemberArgsValidationSchema = z
  .object({
    input: ProjectMemberValidator.schema.pick({
      id: true,
      projectId: true,
      userEmail: true,
      role: true,
    }),
  })
  .strict();
