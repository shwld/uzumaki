import type { BaseAttributes, ValidState } from '../../lib/interfaces';

export interface Account_Attributes extends BaseAttributes {
  name: string;
  createdById: string | null;
}

export interface Account_ValidAttributes
  extends Account_Attributes,
    ValidState {}
