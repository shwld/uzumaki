import { db } from '../../../lib/db';
import { StoryEntity } from 'core-domain';
import { convertToEntity } from '../story-record';

export async function shiftCurrentBoardPriority(args: {
  projectId: string;
  excludedStoryIds: string[];
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
      storyId: {
        notIn: args.excludedStoryIds,
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
        id: {
          notIn: args.excludedStoryIds,
        },
      },
      include: {
        storyOrderPriority: true,
      },
    })
    .then(stories => stories.map(convertToEntity));
}
