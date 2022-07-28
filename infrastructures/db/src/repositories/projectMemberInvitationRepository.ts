import { ProjectMemberInvitation } from '@prisma/client';
import { ProjectMemberInvitationEntity } from 'core-domain';
import type {
  UpdatableProjectMemberInvitationEntityFields,
  Aggregates,
} from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToProjectMemberInvitationEntity = (
  item: ProjectMemberInvitation & { isDeleted?: boolean }
) =>
  new ProjectMemberInvitationEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    projectId: item.projectId,
    membershipId: item.membershipId ?? undefined,
    role: item.role,
    email: item.email,
  });
const mapToDeletedProjectMemberInvitationEntity = (
  item: ProjectMemberInvitation
): ProjectMemberInvitationEntity => {
  return mapToProjectMemberInvitationEntity({ ...item, isDeleted: true });
};
const mapToProjectMemberInvitationEntityOrUndefined = (
  item: ProjectMemberInvitation | null | undefined
) => (item != null ? mapToProjectMemberInvitationEntity(item) : undefined);

const mapFromEntity = (
  item: ProjectMemberInvitationEntity
): UpdatableProjectMemberInvitationEntityFields => ({
  role: item.role,
  email: item.email,
});

/**
 * Repositories
 */
export const projectMemberInvitationRepository: Aggregates['projectMemberInvitation'] =
  {
    async save(item) {
      const projectMemberInvitation =
        await db.projectMemberInvitation.findUnique({
          where: { id: item.id },
        });
      if (projectMemberInvitation == null) {
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
          .then(mapToProjectMemberInvitationEntity);
      } else if (item.isDeleted) {
        return db.projectMemberInvitation
          .delete({ where: { id: item.id } })
          .then(mapToDeletedProjectMemberInvitationEntity);
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
          .then(mapToProjectMemberInvitationEntity);
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
          nodes: items.map(mapToProjectMemberInvitationEntity),
          totalCount: totalCount._count,
        }));
    },
    findBy(args) {
      return db.projectMemberInvitation
        .findFirst({
          where: { id: args.id, projectId: args.project?.id },
        })
        .then(mapToProjectMemberInvitationEntityOrUndefined);
    },
  };
