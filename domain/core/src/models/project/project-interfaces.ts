import type { BaseAttributes, ID, ValidState } from '../../lib/interfaces';

export const ProjectPrivacy = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const;

export type ProjectPrivacy = typeof ProjectPrivacy[keyof typeof ProjectPrivacy];

export interface Project_Attributes extends BaseAttributes {
  name: string;
  privacy: ProjectPrivacy;
  description: string;
  accountId: ID;
  createdById: ID | null;
  boardConfigId: ID;
  boardStatusId: ID;
}

export interface Project_ValidAttributes
  extends Project_Attributes,
    ValidState {}
