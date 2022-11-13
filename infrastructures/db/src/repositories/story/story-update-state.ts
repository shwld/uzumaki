import { StoryEntity, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { picker } from '../../lib/picker';
import { convertToEntity } from './story-record';

export const updateState: Aggregates['story']['updateState'] = input => {
  const { id, attributes } = picker(input);
  const { state, position, priority, projectId } = attributes;
  return tryCatch(async () => {
    let effectedStories: StoryEntity[] = [];
    if (state === 'STARTED') {
      effectedStories = await shiftCurrentBoardPriority({
        projectId,
      });
    }
    const newPriority =
      priority === 'NEWEST_BACKLOG'
        ? ((await findStoryOfFirstBacklog({ projectId }))?.priority ?? 0) + 1
        : priority;
    await db.storyOrderPriority.update({
      data: {
        position,
        priority: newPriority,
      },
      where: {
        storyId: id,
      },
    });
    const story = await db.story.update({
      data: {
        state,
      },
      where: {
        id,
      },
      include: {
        storyOrderPriority: true,
      },
    });

    return { story: convertToEntity(story), effectedStories };
  }, handleError);
};

/**
 * PRIVATE
 */

async function shiftCurrentBoardPriority(args: {
  projectId: string;
}): Promise<StoryEntity[]> {
  await db.storyOrderPriority.updateMany({
    data: {
      priority: {
        increment: 1,
      },
    },
    where: {
      projectId: args.projectId,
      position: 'CURRENT',
      priority: {
        gte: 0,
      },
    },
  });
  return db.story
    .findMany({
      where: {
        storyOrderPriority: {
          position: 'CURRENT',
          priority: {
            gte: 0,
          },
        },
        projectId: args.projectId,
      },
      include: {
        storyOrderPriority: true,
      },
    })
    .then(stories => stories.map(convertToEntity));
}

async function findStoryOfFirstBacklog(args: {
  projectId: string;
}): Promise<StoryEntity | null> {
  return db.story
    .findFirst({
      where: {
        projectId: args.projectId,
        storyOrderPriority: {
          position: 'BACKLOG',
        },
      },
      orderBy: {
        storyOrderPriority: {
          priority: 'desc',
        },
      },
      include: {
        storyOrderPriority: true,
      },
    })
    .then(it => (it != null ? convertToEntity(it) : null));
}
