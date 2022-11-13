import { db, handleErrorOrNotFound } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './account-membership-record';

export const findMembership: Aggregates['account']['findMembership'] = ({
  account,
  user,
}) => {
  return tryCatch(
    () =>
      db.accountMembership
        .findUniqueOrThrow({
          where: {
            userId_accountId: {
              userId: user.id,
              accountId: account.id,
            },
          },
        })
        .then(convertToEntity),
    handleErrorOrNotFound
  );
};
