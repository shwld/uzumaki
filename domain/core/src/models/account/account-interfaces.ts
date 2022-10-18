import * as E from 'fp-ts/Either';
import { InvalidAttributesError } from '../../shared/error';
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
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account_ActiveEntity extends Account_ValidAttributes {
  edit(
    attributes: Account_InputAttributes
  ): E.Either<InvalidAttributesError, Account_ActiveEntity>;
}

export interface Account_InputAttributes extends BaseInputAttributes {
  name?: string | null;
  createdById?: string | null;
}

interface Account_BaseAttributes extends BaseAttributes {
  name: string;
  createdById: string | null;
}

export interface Account_BuiltAttributes
  extends Account_BaseAttributes,
    BuiltState {}

export interface Account_ValidAttributes
  extends Account_BaseAttributes,
    ValidState {}

export interface Account_DraftAttributes
  extends Account_BaseAttributes,
    DraftState {}

export interface Account_RemovingAttributes
  extends Account_BaseAttributes,
    RemovingState {}
