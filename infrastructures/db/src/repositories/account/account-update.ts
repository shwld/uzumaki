import { pipe, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './account-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['account']['update'] = attributes => {
  return pipe(attributes, args => {
    const { id, attributes } = picker(args);
    return tryCatch(
      () =>
        db.account
          .update({
            data: attributes,
            where: { id },
          })
          .then(convertToValidAttributes),
      handleError
    );
  });
};
