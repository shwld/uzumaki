import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './story-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['story']['update'] = input => {
  const { id, attributes } = picker(input);
  const { requesterId, projectId, position, priority, state, ...columns } =
    attributes;

  return tryCatch(async () => {
    return db.story
      .update({
        data: {
          ...columns,
          ...(requesterId != null
            ? {
                requester: {
                  connect: {
                    id: requesterId,
                  },
                },
              }
            : {}),
        },
        where: { id },
        include: { storyOrderPriority: true },
      })
      .then(convertToEntity);
  }, handleError);
};
