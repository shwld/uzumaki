import { InvalidAttributesError } from '../../../shared/error';
import type {
  ProjectMemberRole,
  ProjectMember_Attributes,
} from '../project-member-interfaces';
import { ProjectMemberValidator } from '../project-member-validator';
import { pipe, Result, map } from '../../../shared';
import { DraftState, STATE_IS_DRAFT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface ProjectMember_EditInput {
  role: ProjectMemberRole;
}

export interface ProjectMember_DraftAttributes
  extends ProjectMember_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: ProjectMember_EditInput) =>
  (
    item: ProjectMember_Attributes
  ): Result<InvalidAttributesError, ProjectMember_DraftAttributes> => {
    const newRecord: ProjectMember_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      ProjectMemberValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
