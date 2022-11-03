import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './account-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['account']['update'] = input => {
  const { id, attributes } = picker(input);
  return tryCatch(
    () =>
      db.account
        .update({
          data: attributes,
          where: { id },
        })
        .then(convertToEntity),
    handleError
  );
};
