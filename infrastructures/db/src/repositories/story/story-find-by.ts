import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToEntity } from './story-record';

export const findBy: Aggregates['story']['findBy'] = input => {
  return tryCatch(
    () =>
      db.story
        .findUnique({
          where: {
            id: input.id,
          },
          include: {
            storyOrderPriority: true,
          },
        })
        .then(it => (it == null ? null : convertToEntity(it))),
    handleError
  );
};
