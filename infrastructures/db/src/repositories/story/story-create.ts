import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './story-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['story']['create'] = input => {
  const { id, attributes } = picker(input);
  const { requesterId, projectId, position, priority, ...columns } = attributes;
  return tryCatch(
    () =>
      db.story
        .create({
          data: {
            id,
            ...columns,
            project: {
              connect: {
                id: projectId,
              },
            },
            requester: {
              connect: {
                id: requesterId,
              },
            },
            storyOrderPriority: {
              create: {
                project: {
                  connect: {
                    id: projectId,
                  },
                },
                position: position,
                priority: priority,
              },
            },
          },
          include: {
            storyOrderPriority: true,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
