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

interface AccountMembership_BaseInput extends BaseInputState {
  userId: string;
  accountId: string;
  role: AccountRole;
}

export interface AccountMembership_BuildInput
  extends AccountMembership_BaseInput {}
export interface AccountMembership_EditInput
  extends AccountMembership_BaseInput {}
export interface AccountMembership_RemoveInput extends BaseInputState {}

/**
 * ValidatedInput
 */

interface AccountMembership_BaseValidInput {
  userId: string;
  accountId: string;
  role: AccountRole;
}
export interface AccountMembership_BuildValidInput
  extends AccountMembership_BaseValidInput,
    BuiltState {}
export interface AccountMembership_EditValidInput
  extends AccountMembership_BaseValidInput,
    DraftState {}
export interface AccountMembership_RemoveValidInput extends RemovingState {
  userId: string;
  accountId: string;
}

/**
 * ValidAttributes
 */

export const AccountRole = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
  VIEWER: 'VIEWER',
} as const;

// same as Prisma client
export type AccountRole = typeof AccountRole[keyof typeof AccountRole];
export interface AccountMembership_Record {
  userId: ID;
  accountId: ID;
  role: AccountRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountMembership_Attributes
  extends Omit<BaseAttributes, 'id'>,
    ValidState {
  userId: ID;
  accountId: ID;
  role: AccountRole;
  createdAt: Date;
  updatedAt: Date;
}
