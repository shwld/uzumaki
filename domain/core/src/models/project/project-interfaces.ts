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
interface Project_BaseInput extends BaseInputState {
  id: ID;
  name: string;
  description: string;
  privacy: ProjectPrivacy;
}

export interface Project_BuildInput extends Project_BaseInput {
  accountId: ID;
  createdById: ID;
}
export interface Project_EditInput extends Project_BaseInput {}
export interface Project_RemoveInput extends BaseInputState {
  id: ID;
}

/**
 * ValidatedInput
 */

interface Project_BaseValidInput {
  id: ID;
  name: string;
  description: string;
  privacy: ProjectPrivacy;
}
export interface Project_BuildValidInput
  extends Project_BaseValidInput,
    BuiltState {
  accountId: ID;
  createdById: ID;
}
export interface Project_EditValidInput
  extends Project_BaseValidInput,
    DraftState {}
export interface Project_RemoveValidInput extends RemovingState {
  id: ID;
}

/**
 * ValidAttributes
 */

export const ProjectPrivacy = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const;

export type ProjectPrivacy = typeof ProjectPrivacy[keyof typeof ProjectPrivacy];

// same as Prisma client
export interface Project_Record {
  id: ID;
  name: string;
  privacy: ProjectPrivacy;
  description: string;
  accountId: ID;
  createdById: ID | null;
  boardConfigId: ID;
  boardStatusId: ID;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project_Attributes extends BaseAttributes, ValidState {
  name: string;
  privacy: ProjectPrivacy;
  description: string;
  accountId: ID;
  createdById: ID | null;
  boardConfigId: ID;
  boardStatusId: ID;
}
