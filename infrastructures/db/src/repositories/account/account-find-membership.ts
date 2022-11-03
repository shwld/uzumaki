import { db, handleError, RequiredArgumentResult } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './account-membership-record';

export const findMembership: Aggregates['account']['findMembership'] = ({
  account,
  user,
}) => {
  if (account == null || user == null) {
    return RequiredArgumentResult();
  }
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
        .then(convertToValidAttributes),
    handleError
  );
};
