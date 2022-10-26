import { pipe, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './account-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['account']['destroy'] = attributes => {
  return pipe(attributes, args => {
    const { id } = picker(args);
    return tryCatch(
      () => db.account.delete({ where: { id } }).then(convertToValidAttributes),
      handleError
    );
  });
};
