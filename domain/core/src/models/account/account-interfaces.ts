import * as E from 'fp-ts/Either';
import { InvalidAttributesError } from '../../shared/error';
import { BaseAttributes, BaseValidAttributes } from '../../shared/validator';

export interface Account_Record {
  // from Prisma client
  id: string;
  name: string;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account_ActiveEntity extends Account_ValidAttributes {
  edit(
    attributes: Account_Attributes
  ): E.Either<InvalidAttributesError, Account_ActiveEntity>;
}

export interface Account_Attributes extends BaseAttributes {
  name?: string | null;
  createdById?: string | null;
}

export interface Account_ValidAttributes extends BaseValidAttributes {
  name: string;
  createdById: string | null;
}
