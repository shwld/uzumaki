import { ProjectMembership, User } from '@prisma/client';
import { ProjectUserEntity } from 'core-domain';
import type { UpdatableProjectUserEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToProjectUserEntity = (
  item: ProjectMembership & { user: User; isDeleted?: boolean }
): ProjectUserEntity =>
  new ProjectUserEntity({
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    projectId: item.projectId,
    userId: item.userId,
    name: item.user.name,
    role: item.role,
    isDeleted: item.isDeleted,
  });
const mapToDeletedProjectUserEntity = (
  item: ProjectMembership & { user: User }
): ProjectUserEntity => {
  return mapToProjectUserEntity({ ...item, isDeleted: true });
};
const mapToProjectUserEntityOrUndefined = (
  item: (ProjectMembership & { user: User }) | null | undefined
) => (item != null ? mapToProjectUserEntity(item) : undefined);

const mapFromEntity = (
  item: ProjectUserEntity
): UpdatableProjectUserEntityFields => ({
  role: item.role,
});

/**
 * Repositories
 */
export const projectUserRepository: Aggregates['projectUser'] = {
  async save(item) {
    const projectMembership = await db.projectMembership.findUnique({
      where: {
        userId_projectId: {
          projectId: item.projectId,
          userId: item.userId,
        },
      },
    });
    if (projectMembership == null) {
      return db.projectMembership
        .create({
          data: {
            project: {
              connect: {
                id: item.projectId,
              },
            },
            user: {
              connect: {
                id: item.userId,
              },
            },
            role: item.role,
          },
          include: {
            user: true,
          },
        })
        .then(mapToProjectUserEntity);
    } else if (item.isDeleted) {
      return db.projectMembership
        .delete({
          where: {
            userId_projectId: {
              projectId: item.projectId,
              userId: item.userId,
            },
          },
          include: { user: true },
        })
        .then(mapToDeletedProjectUserEntity);
    } else {
      return db.projectMembership
        .update({
          data: {
            role: item.role,
          },
          where: {
            userId_projectId: {
              projectId: item.projectId,
              userId: item.userId,
            },
          },
          include: {
            user: true,
          },
        })
        .then(mapToProjectUserEntity);
    }
  },
  async findMany({ project, ...args }) {
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
  findBy(args) {
    return db.projectMembership
      .findUnique({
        where: {
          userId_projectId: {
            projectId: args.projectId,
            userId: args.userId,
          },
        },
        include: { user: true },
      })
      .then(mapToProjectUserEntityOrUndefined);
  },
};
