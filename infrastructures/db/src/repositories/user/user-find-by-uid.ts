import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './user-record';

export const findByUid: Aggregates['user']['findByUid'] = input => {
  return tryCatch(
    () =>
      db.user
        .findUnique({
          where: {
            uid: input.uid,
          },
        })
        .then(it => (it == null ? null : convertToValidAttributes(it))),
    handleError
  );
};
