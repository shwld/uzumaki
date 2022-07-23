import { Project, ProjectMembership, User } from '@prisma/client';
import { ProjectEntity, ProjectUserEntity } from 'core-domain';
import type { UpdatableProjectEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToProjectEntity = (item: Project & { isDeleted?: boolean }) =>
  new ProjectEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    name: item.name,
    description: item.description,
    privacy: item.privacy,
    currentVelocity: item.currentVelocity,
    accountId: item.accountId,
    createdById: item.createdById ?? undefined,
    isDeleted: item.isDeleted,
  });
const mapToDeletedProjectEntity = (item: Project): ProjectEntity => {
  return mapToProjectEntity({ ...item, isDeleted: true });
};
const mapToProjectEntityOrUndefined = (item: Project | null | undefined) =>
  item != null ? mapToProjectEntity(item) : undefined;

const mapFromEntity = (item: ProjectEntity): UpdatableProjectEntityFields => ({
  name: item.name,
  description: item.description,
  privacy: item.privacy,
  currentVelocity: item.currentVelocity,
});

const mapToProjectUserEntity = (item: ProjectMembership & { user: User }) =>
  new ProjectUserEntity({
    id: item.userId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    projectId: item.projectId,
    userId: item.userId,
    name: item.user.name,
    role: item.role,
  });
const mapToProjectUserEntityOrUndefined = (
  item: (ProjectMembership & { user: User }) | null | undefined
) => (item != null ? mapToProjectUserEntity(item) : undefined);

/**
 * Repositories
 */
export const projectRepository: Aggregates['project'] = {
  async save(item) {
    const project = await db.project.findUnique({ where: { id: item.id } });
    if (project == null) {
      if (item.createdById == null) {
        throw new Error('createdById is required');
      }
      return db.project
        .create({
          data: {
            id: item.id,
            ...mapFromEntity(item),
            createdBy: {
              connect: {
                id: item.createdById,
              },
            },
            account: {
              connect: {
                id: item.accountId,
              },
            },
          },
        })
        .then(mapToProjectEntity);
    } else if (item.isDeleted) {
      return db.project
        .delete({ where: { id: item.id } })
        .then(mapToDeletedProjectEntity);
    } else {
      return db.project
        .update({
          data: mapFromEntity(item),
          where: { id: item.id },
        })
        .then(mapToProjectEntity);
    }
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
    return db.project.findMany({ ...options, ...args }).then((items) => ({
      nodes: items.map(mapToProjectEntity),
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
  findByUser(args) {
    return db.project
      .findFirst({
        where: {
          OR: [
            {
              id: args.id,
              account: {
                accountMemberships: { some: { userId: args.user.id } },
              },
            },
            {
              id: args.id,
              unaccountedMembers: {
                some: {
                  userId: args.user.id,
                },
              },
            },
          ],
        },
      })
      .then(mapToProjectEntityOrUndefined);
  },
  async memberFindMany({ project, ...args }) {
    const totalCount = await db.projectMembership.aggregate({
      where: { projectId: project.id },
      _count: true,
    });
    const projectMembers = db.project
      .findUnique({ where: { id: project.id } })
      .unaccountedMembers({
        include: { user: true },
        orderBy: {
          createdAt: 'asc',
        },
        ...args,
      })
      .then((members) => ({
        nodes: members.map(mapToProjectUserEntity),
        totalCount: totalCount._count,
      }));

    return projectMembers;
  },
  memberFindBy({ projectId, userId }) {
    return db.projectMembership
      .findUnique({
        where: {
          userId_projectId: {
            projectId,
            userId,
          },
        },
        include: { user: true },
      })
      .then(mapToProjectUserEntityOrUndefined);
  },
};
