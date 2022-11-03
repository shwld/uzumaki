import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './user-record';

export const findBy: Aggregates['user']['findBy'] = input => {
  return tryCatch(
    () =>
      db.user
        .findUnique({
          where: {
            id: input.id,
          },
        })
        .then(it => (it == null ? null : convertToEntity(it))),
    handleError
  );
};
