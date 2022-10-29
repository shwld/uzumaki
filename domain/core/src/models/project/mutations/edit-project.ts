import { InvalidAttributesError } from '../../../lib/error';
import type { ProjectPrivacy, Project_Attributes } from '../project-interfaces';
import { ProjectValidator } from '../project-validator';
import { pipe, Result, map } from '../../../lib/result';
import { DraftState, ID, STATE_IS_DRAFT } from '../../../lib/interfaces';

/**
 * Interfaces
 */
export interface Project_EditInput {
  id: ID;
  name?: string;
  privacy?: ProjectPrivacy;
  description?: string;
}

export interface Project_DraftAttributes
  extends Project_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: Project_EditInput) =>
  (
    item: Project_Attributes
  ): Result<InvalidAttributesError, Project_DraftAttributes> => {
    const newRecord: Project_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      ProjectValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
