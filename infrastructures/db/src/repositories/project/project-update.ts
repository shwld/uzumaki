import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['project']['update'] = attributes => {
  return pipe(attributes, args => {
    const { id, attributes } = picker(args);
    return tryCatch(
      () =>
        db.project
          .update({
            data: attributes,
            where: { id },
          })
          .then(convertToValidAttributes),
      handleError
    );
  });
};
