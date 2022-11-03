import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './story-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['story']['update'] = input => {
  const { id, attributes } = picker(input);
  const { requesterId, projectId, ...columns } = attributes;
  return tryCatch(
    () =>
      db.story
        .update({
          data: {
            ...columns,
            requester:
              requesterId != null
                ? {
                    connect: {
                      id: requesterId,
                    },
                  }
                : undefined,
          },
          where: { id },
          include: { storyOrderPriority: true },
        })
        .then(convertToEntity),
    handleError
  );
};
