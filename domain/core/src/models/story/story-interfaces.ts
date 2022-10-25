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
interface Story_BaseInput extends BaseInputState {
  id: ID;
  name: string;
}

export interface Story_BuildInput extends Story_BaseInput {
  name: string;
  createdById: string;
}
export interface Story_EditInput extends Story_BaseInput {}
export interface Story_RemoveInput extends BaseInputState {}

/**
 * ValidatedInput
 */

interface Story_BaseValidInput {
  id: ID;
  name: string;
}

export interface Story_BuildValidInput
  extends Story_BaseValidInput,
    BuiltState {
  createdById: string;
}

export interface Story_EditValidInput
  extends Story_BaseValidInput,
    DraftState {}

export interface Story_RemoveValidInput extends RemovingState {
  id: ID;
}

/**
 * ValidAttributes
 */

export interface Story_Record {
  // same as Prisma client
  id: ID;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  // createdById: string | null;
}

export interface Story_Attributes extends BaseAttributes, ValidState {
  name: string;
}
