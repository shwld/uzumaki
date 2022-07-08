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
  create(data) {
    return db.story
      .create({
        data: {
          id: data.id,
          ...mapFromEntity(data),
          project: {
            connect: {
              id: data.projectId,
            },
          },
          storyOrderPriority: {
            create: {
              project: {
                connect: {
                  id: data.projectId,
                },
              },
              position: data.position,
              priority: data.priority,
            },
          },
        },
        include: {
          storyOrderPriority: true,
        },
      })
      .then(mapToStoryEntity);
  },
  update(item) {
    return db.story
      .update({
        data: mapFromEntity(item),
        where: { id: item.id },
        include: {
          storyOrderPriority: true,
        },
      })
      .then(mapToStoryEntity);
  },
  destroy(item) {
    return db.story
      .delete({ where: { id: item.id }, include: { storyOrderPriority: true } })
      .then(mapToStoryEntity);
  },
  async findMany({ ...args }) {
    const options = {
      where: {},
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
