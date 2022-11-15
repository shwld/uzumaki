import { StoryEntity, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './story-record';
import { picker } from '../../lib/picker';
import { shiftCurrentBoardPriority } from './shared/shift-current-board-priority';

export const create: Aggregates['story']['create'] = input => {
  const { id, attributes } = picker(input);
  const { requesterId, projectId, position, priority, ...columns } = attributes;
  return tryCatch(async () => {
    let effectedStories: StoryEntity[] = [];
    if (position === 'CURRENT') {
      effectedStories = await shiftCurrentBoardPriority({
        projectId,
      });
    }
    const story = await db.story
      .create({
        data: {
          id,
          ...columns,
          project: {
            connect: {
              id: projectId,
            },
          },
          ...(requesterId != null
            ? {
                requester: {
                  connect: {
                    id: requesterId,
                  },
                },
              }
            : {}),
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
      .then(convertToEntity);
    return { story, effectedStories };
  }, handleError);
};
