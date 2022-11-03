import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './account-membership-record';

export const findMemberships: Aggregates['account']['findMemberships'] =
  account => {
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
          nodes: accountMemberships.map(convertToEntity),
          totalCount: totalCount._count,
        }));
    }, handleError);
  };
