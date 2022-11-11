import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './user-record';

export const findByEmail: Aggregates['user']['findByEmail'] = input => {
  return tryCatch(
    () =>
      db.user
        .findUnique({
          where: {
            email: input.email,
          },
        })
        .then(it => (it == null ? null : convertToEntity(it))),
    handleError
  );
};
