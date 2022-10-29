import type { BaseAttributes, ValidState, ID } from '../../shared/interfaces';

/**
 * ValidAttributes
 */

export const AccountRole = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
  VIEWER: 'VIEWER',
} as const;
export type AccountRole = typeof AccountRole[keyof typeof AccountRole];

export interface AccountMembership_Attributes
  extends Omit<BaseAttributes, 'id'> {
  userId: ID;
  accountId: ID;
  role: AccountRole;
}

export interface AccountMembership_ValidAttributes
  extends AccountMembership_Attributes,
    ValidState {}
