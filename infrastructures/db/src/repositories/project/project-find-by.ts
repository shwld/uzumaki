import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './project-record';

export const findBy: Aggregates['project']['findBy'] = input => {
  return tryCatch(
    () =>
      db.project
        .findUnique({
          where: {
            id: input.id,
          },
          include: {
            boardConfig: true,
            boardStatus: true,
          },
        })
        .then(it => (it == null ? null : convertToEntity(it))),
    handleError
  );
};
