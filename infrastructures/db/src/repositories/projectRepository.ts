import { Project } from '@prisma/client';
import { ProjectEntity } from 'core-domain';
import type { UpdatableProjectEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToProjectEntity = (item: Project) =>
  new ProjectEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    name: item.name,
    description: item.description,
    privacy: item.privacy,
    currentVelocity: item.currentVelocity,
    accountId: item.accountId,
  });
const mapToProjectEntityOrUndefined = (item: Project | null | undefined) =>
  item != null ? mapToProjectEntity(item) : undefined;

const mapFromEntity = (item: ProjectEntity): UpdatableProjectEntityFields => ({
  name: item.name,
  description: item.description,
  privacy: item.privacy,
  currentVelocity: item.currentVelocity,
});

/**
 * Repositories
 */
export const projectRepository: Aggregates['project'] = {
  create(data, account) {
    return db.project
      .create({
        data: {
          id: data.id,
          ...mapFromEntity(data),
          account: {
            connect: {
              id: account.id,
            },
          },
        },
      })
      .then(mapToProjectEntity);
  },
  update(item) {
    return db.project
      .update({
        data: mapFromEntity(item),
        where: { id: item.id },
      })
      .then(mapToProjectEntity);
  },
  destroy(item) {
    return db.project
      .delete({ where: { id: item.id } })
      .then(mapToProjectEntity);
  },
  async findMany({ account, ...args }) {
    const options = {
      where: {
        accountId: account.id,
      },
    };
    const totalCount = await db.project.aggregate({
      ...options,
      _count: true,
    });
    return db.project.findMany({ ...options, ...args }).then((todos) => ({
      nodes: todos.map(mapToProjectEntity),
      totalCount: totalCount._count,
    }));
  },
  findBy(args) {
    return db.project
      .findFirst({
        where: { id: args.id, accountId: args.account.id },
      })
      .then(mapToProjectEntityOrUndefined);
  },
};
