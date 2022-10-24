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

export interface ProjectBoardConfig_EditInput extends BaseInputState {
  id: ID;
  initialVelocity: number;
  startOn?: Date | null;
  startIterationOn: DayOfWeek;
  iterationLength: number;
}

/**
 * ValidatedInput
 */
export interface ProjectBoardConfig_EditValidInput extends DraftState {
  id: ID;
  initialVelocity: number;
  startOn: Date | null;
  startIterationOn: DayOfWeek;
  iterationLength: number;
}

/**
 * ValidAttributes
 */
// same as Prisma client
export const DayOfWeek = {
  SUNDAY: 'SUNDAY',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
} as const;
export type DayOfWeek = typeof DayOfWeek[keyof typeof DayOfWeek];
export interface ProjectBoardConfig_Record {
  id: string;
  initialVelocity: number;
  startOn: Date | null;
  startIterationOn: DayOfWeek;
  iterationLength: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBoardConfig_Attributes
  extends BaseAttributes,
    ValidState {
  initialVelocity: number;
  startOn: Date | null;
  startIterationOn: DayOfWeek;
  iterationLength: number;
}
