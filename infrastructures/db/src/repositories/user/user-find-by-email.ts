import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './user-record';

export const findByEmail: Aggregates['user']['findByEmail'] = input => {
  return tryCatch(
    () =>
      db.user
        .findUnique({
          where: {
            email: input.email,
          },
        })
        .then(it => (it == null ? null : convertToValidAttributes(it))),
    handleError
  );
};
