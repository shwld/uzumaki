import { Story, StoryOrderPriority } from '@prisma/client';
import { StoryEntity } from 'core-domain';
import type { UpdatableStoryEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

type StoryWithPosition = Story & {
  storyOrderPriority: StoryOrderPriority | null;
};

/**
 * Mappers
 */
const mapToStoryEntity = (
  item: StoryWithPosition & { isDeleted?: boolean }
): StoryEntity => {
  if (item.storyOrderPriority == null)
    throw new Error('storyOrderPriority is required');
  return new StoryEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    title: item.title,
    description: item.description,
    state: item.state,
    kind: item.kind,
    points: item.points ?? undefined,
    releaseDate: item.releaseDate ?? undefined,

    position: item.storyOrderPriority.position,
    priority: item.storyOrderPriority.priority,

    requesterId: item.requesterId ?? undefined,
    projectId: item.projectId,
    isDeleted: item.isDeleted,
  });
};
const mapToDeletedStoryEntity = (item: StoryWithPosition): StoryEntity => {
  return mapToStoryEntity({ ...item, isDeleted: true });
};
const mapToStoryEntityOrUndefined = (
  item: StoryWithPosition | null | undefined
) => (item != null ? mapToStoryEntity(item) : undefined);

const mapFromEntity = (item: StoryEntity): UpdatableStoryEntityFields => ({
  title: item.title,
  description: item.description,
  state: item.state,
  kind: item.kind,
  points: item.points,
  releaseDate: item.releaseDate,
});

/**
 * Repositories
 */
export const storyRepository: Aggregates['story'] = {
  async save(item) {
    const story = await db.story.findUnique({ where: { id: item.id } });
    if (story == null) {
      return db.story
        .create({
          data: {
            id: item.id,
            ...mapFromEntity(item),
            project: {
              connect: {
                id: item.projectId,
              },
            },
            requester: {
              connect: {
                id: item.requesterId,
              },
            },
            storyOrderPriority: {
              create: {
                project: {
                  connect: {
                    id: item.projectId,
                  },
                },
                position: item.position,
                priority: item.priority,
              },
            },
          },
          include: {
            storyOrderPriority: true,
          },
        })
        .then(mapToStoryEntity);
    } else if (item.isDeleted) {
      return db.story
        .delete({
          where: { id: item.id },
          include: { storyOrderPriority: true },
        })
        .then(mapToDeletedStoryEntity);
    } else {
      if (item.isMoved) {
        await db.storyOrderPriority.update({
          data: {
            position: item.position,
            priority: item.priority,
          },
          where: {
            storyId: item.id,
          },
        });
      }

      if (!item.isUpdated) return item;

      return db.story
        .update({
          data: {
            ...mapFromEntity(item),
            requester:
              item.requesterId != null
                ? {
                    connect: {
                      id: item.requesterId,
                    },
                  }
                : undefined,
          },
          where: { id: item.id },
          include: {
            storyOrderPriority: true,
          },
        })
        .then(mapToStoryEntity);
    }
  },
  async findMany({ project, ids, position, orderBy, ...args }) {
    const options = {
      where: {
        projectId: project?.id,
        id: ids != null ? { in: ids } : undefined,
        storyOrderPriority:
          position != null
            ? {
                position: {
                  in: position,
                },
              }
            : undefined,
      },
    };
    const totalCount = await db.story.aggregate({
      ...options,
      _count: true,
    });
    return db.story
      .findMany({
        ...options,
        orderBy: {
          storyOrderPriority: {
            priority: orderBy?.priority,
            position: orderBy?.position,
          },
        },
        ...args,
        include: { storyOrderPriority: true },
      })
      .then(stories => ({
        nodes: stories.map(mapToStoryEntity),
        totalCount: totalCount._count,
      }));
  },
  findBy(args) {
    return db.story
      .findFirst({
        where: { id: args.id, projectId: args.project?.id },
        include: {
          storyOrderPriority: true,
        },
      })
      .then(mapToStoryEntityOrUndefined);
  },
  async incrementPriority(args) {
    await db.storyOrderPriority.updateMany({
      data: {
        priority: {
          increment: 1,
        },
      },
      where: {
        projectId: args.projectId,
        position: args.position,
        priority: args.priority,
      },
    });
    return db.story
      .findMany({
        where: {
          storyOrderPriority: {
            position: args.position,
            priority: args.priority,
          },
          projectId: args.projectId,
        },
        include: {
          storyOrderPriority: true,
        },
      })
      .then(stories => stories.map(mapToStoryEntity));
  },
  async findMaxPriority(args) {
    return db.story
      .findFirst({
        where: {
          projectId: args.projectId,
          storyOrderPriority: {
            position: args.position,
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
      .then(mapToStoryEntityOrUndefined);
  },
};
