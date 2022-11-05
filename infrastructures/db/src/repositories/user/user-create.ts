import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './user-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['user']['create'] = input => {
  const { id, attributes } = picker(input);
  const { ...columns } = attributes;
  return tryCatch(
    () =>
      db.user
        .create({
          data: {
            id,
            ...columns,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
