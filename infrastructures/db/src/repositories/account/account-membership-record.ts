import { AccountMembership } from '@prisma/client';
import { AccountMembershipEntity } from 'core-domain';

export const convertToEntity = (
  record: AccountMembership
): AccountMembershipEntity => {
  return AccountMembershipEntity(record);
};
