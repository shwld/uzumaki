import type {
  BaseAttributes,
  BaseInputState,
  ValidState,
  DraftState,
  RemovingState,
  BuiltState,
  ID,
} from '../../shared/interfaces';

/**
 * UnvalidatedInput
 */

interface User_BaseInput extends BaseInputState {
  id: ID;
  name: string;
  avatarImageUrl: string;
}

export interface User_BuildInput extends User_BaseInput {
  uid: string;
  email: string;
}
export interface User_EditInput extends User_BaseInput {}
export interface User_RemoveInput extends BaseInputState {}

/**
 * ValidatedInput
 */

interface User_BaseValidInput {
  id: ID;
  name: string;
  avatarImageUrl: string;
}

export interface User_BuildValidInput extends User_BaseValidInput, BuiltState {
  uid: string;
  email: string;
}
export interface User_EditValidInput extends User_BaseValidInput, DraftState {}
export interface User_RemoveValidInput extends RemovingState {
  id: ID;
}

/**
 * ValidAttributes
 */

export interface User_Record {
  // same as Prisma client
  id: ID;
  uid: string;
  email: string;
  name: string;
  avatarImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User_Attributes extends BaseAttributes, ValidState {
  uid: string;
  email: string;
  name: string;
  avatarImageUrl: string;
}
