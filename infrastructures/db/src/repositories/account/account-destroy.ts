import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './account-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['account']['destroy'] = input => {
  const { id } = picker(input);
  return tryCatch(
    () => db.account.delete({ where: { id } }).then(convertToEntity),
    handleError
  );
};
