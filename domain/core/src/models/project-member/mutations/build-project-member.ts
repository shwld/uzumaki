import { InvalidAttributesError } from '../../../shared/error';
import type {
  ProjectMemberRole,
  ProjectMemberUser_Attributes,
  ProjectMember_Attributes,
} from '../project-member-interfaces';
import { ProjectMemberValidator } from '../project-member-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { z } from 'zod';
import { validateWith } from '../../../shared/validator';

/**
 * Interfaces
 */
export interface ProjectMember_BuildInput {
  id: ID;
  projectId: ID;
  role: ProjectMemberRole;
  createdByInvitationId: ID;
}

export interface ProjectMember_BuiltAttributes
  extends ProjectMember_Attributes,
    BuiltState {
  createdByInvitationId: ID;
}

/**
 * Validation
 */
export const validationSchema = z
  .object({
    ...ProjectMemberValidator.validators,
    createdByInvitationId: z.string().uuid(),
  })
  .strict();

/**
 * Mutation
 */
export const build =
  (input: ProjectMember_BuildInput) =>
  (
    user: ProjectMemberUser_Attributes
  ): Result<InvalidAttributesError, ProjectMember_BuiltAttributes> => {
    return pipe(
      {
        ...input,
        user,
        userId: user.id,
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
