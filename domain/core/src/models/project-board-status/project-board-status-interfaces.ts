import type {
  BaseAttributes,
  BaseInputState,
  ValidState,
  DraftState,
  ID,
} from '../../shared/interfaces';

/**
 * UnvalidatedInput
 */

export interface ProjectBoardStatus_EditInput extends BaseInputState {
  id: ID;
  velocity: number;
}

/**
 * ValidatedInput
 */
export interface ProjectBoardStatus_EditValidInput extends DraftState {
  id: ID;
  velocity: number;
}

/**
 * ValidAttributes
 */
// same as Prisma client
export interface ProjectBoardStatus_Record {
  id: ID;
  velocity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBoardStatus_Attributes
  extends BaseAttributes,
    ValidState {
  velocity: number;
}
