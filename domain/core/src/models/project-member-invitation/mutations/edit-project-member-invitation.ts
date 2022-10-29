import { InvalidAttributesError } from '../../../lib/error';
import type { ProjectMemberInvitation_Attributes } from '../project-member-invitation-interfaces';
import { ProjectMemberInvitationValidator } from '../project-member-invitation-validator';
import { pipe, Result, map } from '../../../lib/result';
import { DraftState, ID, STATE_IS_DRAFT } from '../../../lib/interfaces';
import { ProjectMemberRole } from '../../project-member/project-member-interfaces';

/**
 * Interfaces
 */
export interface ProjectMemberInvitation_EditInput {
  role: ProjectMemberRole;
}

export interface ProjectMemberInvitation_DraftAttributes
  extends ProjectMemberInvitation_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: ProjectMemberInvitation_EditInput) =>
  (
    item: ProjectMemberInvitation_Attributes
  ): Result<
    InvalidAttributesError,
    ProjectMemberInvitation_DraftAttributes
  > => {
    const newRecord: ProjectMemberInvitation_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      ProjectMemberInvitationValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
