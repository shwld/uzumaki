import { db, handleError } from '../../lib/db';
import { Aggregates, tryCatch } from 'core-domain';
import { convertToValidAttributes } from './account-membership-record';

export const memberships: Aggregates['account']['memberships'] = account => {
  return tryCatch(async () => {
    const totalCount = await db.accountMembership.aggregate({
      where: {
        accountId: account.id,
      },
      _count: true,
    });
    return db.account
      .findUnique({ where: { id: account.id } })
      .accountMemberships()
      .then(accountMemberships => ({
        nodes: accountMemberships.map(convertToValidAttributes),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
