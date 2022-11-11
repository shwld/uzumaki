import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './story-record';

export const find: Aggregates['story']['find'] = input => {
  return tryCatch(
    () =>
      db.story
        .findUniqueOrThrow({
          where: {
            id: input.id,
          },
          include: {
            storyOrderPriority: true,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
