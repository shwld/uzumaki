import { z } from 'zod';
import { InvalidAttributesError } from '../../shared/error';
import { Result, toResult } from '../../shared/functional';
import { genericValidator } from '../../shared/validator';
import { userValidator } from '../user';
import {
  ProjectMember_BuildInput,
  ProjectMember_BuildValidInput,
  ProjectMember_EditInput,
  ProjectMember_EditValidInput,
} from './project-member-interfaces';

export const projectMemberValidator = {
  projectId: genericValidator.id,
  userId: genericValidator.id,
  createdByInvitationId: z.string().uuid().optional(),
  role: z.enum(['OWNER', 'MEMBER', 'VIEWER']),
  name: z.string().min(1),
  avatarImageUrl: userValidator.avatarImageUrl,
};

export const projectMemberValidationSchema = z
  .object({
    __state: genericValidator.__state,
    id: genericValidator.id,
  })
  .merge(z.object(projectMemberValidator))
  .strict();

export function validateOnBuild(
  input: ProjectMember_BuildInput
): Result<InvalidAttributesError, ProjectMember_BuildValidInput> {
  const parsedInput = projectMemberValidationSchema
    .transform<ProjectMember_BuildValidInput>(v => ({
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
  input: ProjectMember_EditInput
): Result<InvalidAttributesError, ProjectMember_EditValidInput> {
  const parsedInput = projectMemberValidationSchema
    .transform<ProjectMember_EditValidInput>(v => ({
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
