import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './user-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['user']['destroy'] = input => {
  const { id } = picker(input);
  return tryCatch(
    () => db.user.delete({ where: { id } }).then(convertToEntity),
    handleError
  );
};
