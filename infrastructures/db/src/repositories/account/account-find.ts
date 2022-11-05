import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './account-record';

export const find: Aggregates['account']['find'] = args => {
  return tryCatch(
    () =>
      db.account
        .findUniqueOrThrow({
          where: {
            id: args.id,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
