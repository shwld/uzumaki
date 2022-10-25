import type {
  BaseAttributes,
  UnvalidatedState,
  ValidState,
  DraftState,
  RemovingState,
  BuiltState,
  ID,
} from '../../shared/interfaces';

/**
 * UnvalidatedInput
 */
export interface Account_Attributes extends BaseAttributes {
  name: string;
  createdById: string | null;
}

export interface Account_ValidAttributes
  extends Account_Attributes,
    ValidState {}
