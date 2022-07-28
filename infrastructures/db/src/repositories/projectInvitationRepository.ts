import { ProjectMemberInvitation } from '@prisma/client';
import { ProjectInvitationEntity } from 'core-domain';
import type {
  UpdatableProjectInvitationEntityFields,
  Aggregates,
} from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToProjectInvitationEntity = (
  item: ProjectMemberInvitation & { isDeleted?: boolean }
) =>
  new ProjectInvitationEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    projectId: item.projectId,
    membershipId: item.membershipId ?? undefined,
    role: item.role,
    email: item.email,
  });
const mapToDeletedProjectInvitationEntity = (
  item: ProjectMemberInvitation
): ProjectInvitationEntity => {
  return mapToProjectInvitationEntity({ ...item, isDeleted: true });
};
const mapToProjectInvitationEntityOrUndefined = (
  item: ProjectMemberInvitation | null | undefined
) => (item != null ? mapToProjectInvitationEntity(item) : undefined);

const mapFromEntity = (
  item: ProjectInvitationEntity
): UpdatableProjectInvitationEntityFields => ({
  role: item.role,
  email: item.email,
});

/**
 * Repositories
 */
export const projectInvitationRepository: Aggregates['projectInvitation'] = {
  async save(item) {
    const projectInvitation = await db.projectMemberInvitation.findUnique({
      where: { id: item.id },
    });
    if (projectInvitation == null) {
      return db.projectMemberInvitation
        .create({
          data: {
            id: item.id,
            ...mapFromEntity(item),
            project: {
              connect: {
                id: item.projectId,
              },
            },
          },
        })
        .then(mapToProjectInvitationEntity);
    } else if (item.isDeleted) {
      return db.projectMemberInvitation
        .delete({ where: { id: item.id } })
        .then(mapToDeletedProjectInvitationEntity);
    } else {
      return db.projectMemberInvitation
        .update({
          data: {
            ...mapFromEntity(item),
            membership: {
              connect: {
                id: item.id,
              },
            },
          },
          where: { id: item.id },
        })
        .then(mapToProjectInvitationEntity);
    }
  },
  async findMany({ project, ...args }) {
    const options = {
      where: {
        projectId: project?.id,
      },
    };
    const totalCount = await db.projectMemberInvitation.aggregate({
      ...options,
      _count: true,
    });
    return db.projectMemberInvitation
      .findMany({ ...options, ...args })
      .then(items => ({
        nodes: items.map(mapToProjectInvitationEntity),
        totalCount: totalCount._count,
      }));
  },
  findBy(args) {
    return db.projectMemberInvitation
      .findFirst({
        where: { id: args.id, projectId: args.project?.id },
      })
      .then(mapToProjectInvitationEntityOrUndefined);
  },
};
