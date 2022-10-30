import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-record';

export const create: Aggregates['project']['create'] = attributes => {
  return pipe(attributes, ({ __state, ...record }) => {
    return tryCatch(
      () =>
        db.project
          .create({
            data: {
              ...record,
            },
          })
          .then(convertToValidAttributes),
      handleError
    );
  });
};
