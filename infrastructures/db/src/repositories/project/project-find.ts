import { db, handleErrorOrNotFound } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-record';

export const find: Aggregates['project']['find'] = input => {
  return tryCatch(() => {
    return db.project
      .findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          boardConfig: true,
          boardStatus: true,
        },
      })
      .then(convertToEntity);
  }, handleErrorOrNotFound);
};
