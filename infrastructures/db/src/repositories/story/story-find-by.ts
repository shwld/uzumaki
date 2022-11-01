import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './story-record';

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
        .then(it => (it == null ? null : convertToValidAttributes(it))),
    handleError
  );
};
