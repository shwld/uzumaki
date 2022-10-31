import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './account-membership-record';

export const membership: Aggregates['account']['membership'] = (
  account,
  user
) => {
  return tryCatch(
    () =>
      db.accountMembership
        .findUnique({
          where: {
            userId_accountId: {
              userId: user.id,
              accountId: account.id,
            },
          },
        })
        .then(it => (it == null ? null : convertToValidAttributes(it))),
    handleError
  );
};
