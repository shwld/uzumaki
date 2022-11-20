import { InvalidAttributesError } from '../../../shared/error';
import type { UserProfile_Attributes } from '..';
import { UserProfileValidator } from '../user-profile-validator';
import { pipe, Result, map } from '../../../shared';
import { DraftState, STATE_IS_DRAFT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface UserProfile_EditInput {
  name?: string;
  avatarImageUrl?: string;
}

export interface UserProfile_DraftAttributes
  extends UserProfile_Attributes,
    DraftState {}

/**
 * Mutation
 */
export const edit =
  (input: UserProfile_EditInput) =>
  (
    item: UserProfile_Attributes
  ): Result<InvalidAttributesError, UserProfile_DraftAttributes> => {
    const newRecord: UserProfile_Attributes = {
      ...item,
      ...input,
    };
    return pipe(
      newRecord,
      UserProfileValidator.validate,
      map(v => ({ ...v, __state: STATE_IS_DRAFT }))
    );
  };
