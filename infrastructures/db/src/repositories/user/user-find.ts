import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './user-record';

export const find: Aggregates['user']['find'] = input => {
  return tryCatch(
    () =>
      db.user
        .findUniqueOrThrow({
          where: {
            id: input.id,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
