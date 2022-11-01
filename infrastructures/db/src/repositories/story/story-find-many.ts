import { db, handleError } from '../../lib/db';
import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './story-record';

export const findMany: Aggregates['story']['findMany'] = ({
  project,
  ids,
  position,
  ...input
}) => {
  const options = {
    where: {
      projectId: project?.id,
      id: ids != null ? { in: ids } : undefined,
      storyOrderPriority:
        position != null
          ? {
              position,
            }
          : undefined,
    },
  };
  return tryCatch(async () => {
    const totalCount = await db.story.aggregate({
      ...options,
      _count: true,
    });
    return db.story
      .findMany({
        ...options,
        ...input,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          storyOrderPriority: true,
        },
      })
      .then(items => ({
        nodes: items.map(convertToValidAttributes),
        totalCount: totalCount._count,
      }));
  }, handleError);
};
