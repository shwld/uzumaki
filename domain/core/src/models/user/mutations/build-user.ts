import { InvalidAttributesError } from '../../../shared/error';
import type { User_Attributes } from '../user-interfaces';
import { UserValidator } from '../user-validator';
import { pipe, Result, map } from '../../../shared';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';

/**
 * Interfaces
 */
export interface User_BuildInput {
  id: ID;
  uid: string;
  email: string;
  name: string;
  avatarImageUrl: string;
}

export interface User_BuiltAttributes extends User_Attributes, BuiltState {}

/**
 * Mutation
 */
export const build = (
  input: User_BuildInput
): Result<InvalidAttributesError, User_BuiltAttributes> => {
  return pipe(
    {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    UserValidator.validate,
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
