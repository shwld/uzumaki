import {
  projectMemberInvitationValidator,
  projectMemberValidationSchema,
} from 'core-domain';
import { z } from 'zod';

export const joinProjectMemberArgsValidationSchema = z.object({
  input: projectMemberValidationSchema
    .pick({
      id: true,
    })
    .merge(
      z.object({
        projectMemberInvitationId: projectMemberInvitationValidator.id,
      })
    ),
});
