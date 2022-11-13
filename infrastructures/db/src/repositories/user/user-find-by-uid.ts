import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './user-record';

export const findByUid: Aggregates['user']['findByUid'] = input => {
  return tryCatch(
    () =>
      db.user
        .findUnique({
          where: {
            uid: input.uid,
          },
        })
        .then(it => (it == null ? null : convertToEntity(it))),
    handleError
  );
};
