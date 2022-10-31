import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './account-record';

export const findBy: Aggregates['account']['findBy'] = args => {
  return tryCatch(
    () =>
      db.account
        .findFirst({
          where: {
            id: args.id,
            accountMemberships: {
              some: {
                userId: args.user.id,
              },
            },
          },
        })
        .then(it => (it == null ? null : convertToValidAttributes(it))),
    handleError
  );
};
