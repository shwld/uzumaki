import type { BaseAttributes, ValidState } from '../../shared/interfaces';

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

export interface ProjectBoardConfig_Attributes extends BaseAttributes {
  initialVelocity: number;
  startOn: Date | null;
  startIterationOn: DayOfWeek;
  iterationLength: number;
}

export interface ProjectBoardConfig_ValidAttributes
  extends ProjectBoardConfig_Attributes,
    ValidState {}
