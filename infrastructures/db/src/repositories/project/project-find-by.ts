import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './project-record';

export const findBy: Aggregates['project']['findBy'] = args => {
  return tryCatch(
    () =>
      db.project
        .findUnique({
          where: {
            id: args.id,
          },
          include: {
            boardConfig: true,
            boardStatus: true,
          },
        })
        .then(it => (it == null ? null : convertToValidAttributes(it))),
    handleError
  );
};
