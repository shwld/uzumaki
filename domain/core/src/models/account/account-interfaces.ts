import type {
  BaseInputAttributes,
  BaseAttributes,
  ValidState,
  DraftState,
  RemovingState,
  BuiltState,
} from '../../shared/interfaces';

export interface Account_Record {
  // same as Prisma client
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  // createdById: string | null;
}

export interface Account_BuildInput extends BaseInputAttributes {
  name?: string | null;
  createdById?: string;
}

export interface Account_EditInput extends BaseInputAttributes {
  name?: string | null;
}

interface Account_BaseAttributes extends BaseAttributes {
  name: string;
}

export interface Account_BuiltAttributes
  extends Account_BaseAttributes,
    BuiltState {
  createdById: string;
}

export interface Account_ValidAttributes
  extends Account_BaseAttributes,
    ValidState {}

export interface Account_DraftAttributes
  extends Account_BaseAttributes,
    DraftState {}

export interface Account_RemovingAttributes
  extends Account_BaseAttributes,
    RemovingState {}
