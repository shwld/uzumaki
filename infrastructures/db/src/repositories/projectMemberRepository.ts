import { ProjectMembership, User } from '@prisma/client';
import { ProjectMemberEntity } from 'core-domain';
import type {
  UpdatableProjectMemberEntityFields,
  Aggregates,
} from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToProjectMemberEntity = (
  item: ProjectMembership & { user: User; isDeleted?: boolean }
): ProjectMemberEntity =>
  new ProjectMemberEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    projectId: item.projectId,
    userId: item.userId,
    name: item.user.name,
    role: item.role,
    avatarImageUrl: item.user.avatarImageUrl,
    isDeleted: item.isDeleted,
  });
const mapToDeletedProjectMemberEntity = (
  item: ProjectMembership & { user: User }
): ProjectMemberEntity => {
  return mapToProjectMemberEntity({ ...item, isDeleted: true });
};
const mapToProjectMemberEntityOrUndefined = (
  item: (ProjectMembership & { user: User }) | null | undefined
) => (item != null ? mapToProjectMemberEntity(item) : undefined);

/**
 * Repositories
 */
export const projectMemberRepository: Aggregates['projectMember'] = {
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
            id: item.id,
            role: item.role,
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
            ...(item.createdByInvitationId != null
              ? {
                  invitations: {
                    connect: {
                      id: item.createdByInvitationId,
                    },
                  },
                }
              : {}),
          },
          include: {
            user: true,
          },
        })
        .then(mapToProjectMemberEntity);
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
        .then(mapToDeletedProjectMemberEntity);
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
        .then(mapToProjectMemberEntity);
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
      .then(members => ({
        nodes: members.map(mapToProjectMemberEntity),
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
      .then(mapToProjectMemberEntityOrUndefined);
  },
};
