import { InvalidAttributesError } from '../../../shared/error';
import type {
  ProjectMemberRole,
  ProjectMember_Attributes,
} from '../project-member-interfaces';
import { ProjectMemberValidator } from '../project-member-validator';
import { pipe, Result, map, tap } from '../../../shared';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { z } from 'zod';
import { validateWith } from '../../../shared/validator';
import { UserEntity, UserValidator } from '../../user';

/**
 * Interfaces
 */
export interface ProjectMember_BuildInput {
  id: ID;
  projectId: ID;
  role: ProjectMemberRole;
  createdByInvitationId: ID;
  user: UserEntity;
}

export interface ProjectMember_BuiltAttributes
  extends ProjectMember_Attributes,
    BuiltState {
  createdByInvitationId: ID;
}

/**
 * Validation
 */
export const validationSchema = z.object({
  ...ProjectMemberValidator.validators,
  createdByInvitationId: z.string().uuid(),
  user: UserValidator.schema.pick({
    id: true,
    name: true,
    avatarImageUrl: true,
  }),
});

/**
 * Mutation
 */
export const build = (
  input: ProjectMember_BuildInput
): Result<InvalidAttributesError, ProjectMember_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      user: {
        id: input.user.id,
        name: input.user.name,
        avatarImageUrl: input.user.avatarImageUrl,
      },
      userId: input.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    validateWith(validationSchema),
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
