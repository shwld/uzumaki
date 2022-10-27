import { InvalidAttributesError } from '../../../shared/error';
import type { ProjectMemberInvitation_Attributes } from '../project-member-invitation-interfaces';
import { ProjectMemberInvitationValidator } from '../project-member-invitation-validator';
import { pipe, Result, map } from '../../../shared/functional';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { z } from 'zod';
import { validateWith } from '../../../shared/validator';
import { ProjectMemberRole } from '../../project-member/project-member-interfaces';

/**
 * Interfaces
 */
export interface ProjectMemberInvitation_BuildInput {
  id: ID;
  projectId: string;
  role: ProjectMemberRole;
  email: string;
}

export interface ProjectMemberInvitation_BuiltAttributes
  extends ProjectMemberInvitation_Attributes,
    BuiltState {}

/**
 * Mutation
 */
export const build = (
  input: ProjectMemberInvitation_BuildInput
): Result<InvalidAttributesError, ProjectMemberInvitation_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      membershipId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ProjectMemberInvitationValidator.validate,
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
