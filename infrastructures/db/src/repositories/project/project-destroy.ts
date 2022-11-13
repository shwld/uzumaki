import { pipe, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['project']['destroy'] = input => {
  const { id } = picker(input);
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
        .then(convertToEntity),
    handleError
  );
};
