import {
  ProjectMemberInvitationTokenValidator,
  ProjectMemberInvitationValidator,
} from 'core-domain';
import { z } from 'zod';

export const joinProjectMemberArgsValidationSchema = z.object({
  input: z
    .object({
      memberId: ProjectMemberInvitationValidator.validators.id,
      confirmationToken: ProjectMemberInvitationTokenValidator.validators.id,
    })
    .strict(),
});
