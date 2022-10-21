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

interface Account_BaseInput extends BaseInputState {
  id: ID;
  name: string;
}

export interface Account_BuildInput extends Account_BaseInput {
  name: string;
  createdById: string;
}
export interface Account_EditInput extends Account_BaseInput {}

export interface Account_RemoveInput extends BaseInputState {}

/**
 * ValidatedInput
 */

interface Account_BaseValidInput {
  id: ID;
  name: string;
}

export interface Account_BuildValidInput
  extends Account_BaseValidInput,
    BuiltState {
  createdById: string;
}

export interface Account_EditValidInput
  extends Account_BaseValidInput,
    DraftState {}

export interface Account_RemoveValidInput extends RemovingState {
  id: ID;
}

/**
 * ValidAttributes
 */

export interface Account_Record {
  // same as Prisma client
  id: ID;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  // createdById: string | null;
}

export interface Account_Attributes extends BaseAttributes, ValidState {
  id: ID;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
