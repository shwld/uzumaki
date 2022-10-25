import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { Result, toResult } from '../../shared/functional';
import { genericValidator } from '../../shared/validator';
import { projectMemberValidator } from '../project-member/project-member-validator';
import { userValidator } from '../user';
import {
  ProjectMemberInvitation_BuildInput,
  ProjectMemberInvitation_BuildValidInput,
  ProjectMemberInvitation_EditInput,
  ProjectMemberInvitation_EditValidInput,
} from './project-member-invitation-interfaces';

export const projectMemberInvitationValidator = {
  email: z.string().email(),
  role: projectMemberValidator.role,
};

export const projectMemberInvitationValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(projectMemberInvitationValidator))
  .strict();

export function validateOnBuild(
  input: ProjectMemberInvitation_BuildInput
): Result<InvalidAttributesError, ProjectMemberInvitation_BuildValidInput> {
  const parsedInput = projectMemberInvitationValidationSchema
    .merge(
      z.object({
        projectId: z.string().uuid(),
        membershipId: z.string().uuid().optional(),
      })
    )
    .transform<ProjectMemberInvitation_BuildValidInput>(v => ({
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
  input: ProjectMemberInvitation_EditInput
): Result<InvalidAttributesError, ProjectMemberInvitation_EditValidInput> {
  const parsedInput = projectMemberInvitationValidationSchema
    .merge(
      z.object({
        membershipId: z.string().uuid().nullable(),
      })
    )
    .transform<ProjectMemberInvitation_EditValidInput>(v => ({
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
