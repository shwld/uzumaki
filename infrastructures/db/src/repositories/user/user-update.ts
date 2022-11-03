import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './user-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['user']['update'] = input => {
  const { id, attributes } = picker(input);
  return tryCatch(
    () =>
      db.user
        .update({
          data: attributes,
          where: { id },
        })
        .then(convertToEntity),
    handleError
  );
};
