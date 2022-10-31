import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['project']['update'] = input => {
  const { id, attributes } = picker(input);
  const { boardStatusId, boardConfigId, accountId, createdById, ...columns } =
    attributes;
  return tryCatch(
    () =>
      db.project
        .update({
          data: columns,
          where: { id },
          include: {
            boardConfig: true,
            boardStatus: true,
          },
        })
        .then(convertToValidAttributes),
    handleError
  );
};
