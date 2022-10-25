import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { Result, toResult } from '../../shared/functional';
import { genericValidator } from '../../shared/validator';
import { projectMemberValidator } from '../project-member/project-member-validator';
import {
  ProjectMemberInvitationToken_BuildInput,
  ProjectMemberInvitationToken_BuildValidInput,
  ProjectMemberInvitationToken_EditInput,
  ProjectMemberInvitationToken_EditValidInput,
} from './project-member-invitation-token-interfaces';

export const projectMemberInvitationValidator = {
  expiredAt: z.date(),
};

export const projectMemberInvitationValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(projectMemberInvitationValidator))
  .strict();

export function validateOnBuild(
  input: ProjectMemberInvitationToken_BuildInput
): Result<
  InvalidAttributesError,
  ProjectMemberInvitationToken_BuildValidInput
> {
  const parsedInput = projectMemberInvitationValidationSchema
    .merge(
      z.object({
        projectId: z.string().uuid(),
        membershipId: z.string().uuid().optional(),
      })
    )
    .transform<ProjectMemberInvitationToken_BuildValidInput>(v => ({
      ...v,
      __state: 'Built',
    }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}

export function validateOnEdit(
  input: ProjectMemberInvitationToken_EditInput
): Result<InvalidAttributesError, ProjectMemberInvitationToken_EditValidInput> {
  const parsedInput = projectMemberInvitationValidationSchema
    .merge(
      z.object({
        membershipId: z.string().uuid().nullable(),
      })
    )
    .transform<ProjectMemberInvitationToken_EditValidInput>(v => ({
      ...v,
      __state: 'Draft',
    }))
    .safeParse(input);

  return toResult(
    !parsedInput.success
      ? Result.left(InvalidAttributesError.from(parsedInput.error))
      : Result.right(parsedInput.data)
  );
}
