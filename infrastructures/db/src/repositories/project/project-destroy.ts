import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['project']['destroy'] = attributes => {
  return pipe(attributes, args => {
    const { id } = picker(args);
    return tryCatch(
      () =>
        db.project
          .delete({
            where: { id },
            include: {
              boardConfig: true,
              boardStatus: true,
            },
          })
          .then(convertToValidAttributes),
      handleError
    );
  });
};
