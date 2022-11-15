import { db } from '../../../lib/db';
import { StoryEntity } from 'core-domain';
import { convertToEntity } from '../story-record';

export async function shiftCurrentBoardPriority(args: {
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
