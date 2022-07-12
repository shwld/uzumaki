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
const mapToStoryEntity = (item: StoryWithPosition) => {
  if (item.storyOrderPriority == null)
    throw new Error('storyOrderPriority is required');
  return new StoryEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    isDeleted: false,

    title: item.title,
    description: item.description,
    state: item.state,
    kind: item.kind,
    points: item.points,
    releaseDate: item.releaseDate,

    position: item.storyOrderPriority.position,
    priority: item.storyOrderPriority.priority,

    requesterId: item.requesterId,
    projectId: item.projectId,
  });
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
        .then(mapToStoryEntity);
    } else {
      return db.story
        .update({
          data: mapFromEntity(item),
          where: { id: item.id },
          include: {
            storyOrderPriority: true,
          },
        })
        .then(mapToStoryEntity);
    }
  },
  async findMany({ project, ...args }) {
    const options = {
      where: {
        projectId: project.id,
      },
    };
    const totalCount = await db.story.aggregate({
      ...options,
      _count: true,
    });
    return db.story
      .findMany({ ...options, ...args, include: { storyOrderPriority: true } })
      .then((todos) => ({
        nodes: todos.map(mapToStoryEntity),
        totalCount: totalCount._count,
      }));
  },
  findBy(args) {
    return db.story
      .findFirst({
        where: { id: args.id },
        include: {
          storyOrderPriority: true,
        },
      })
      .then(mapToStoryEntityOrUndefined);
  },
};
