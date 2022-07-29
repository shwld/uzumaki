import {
  ProjectMemberInvitation,
  ProjectMemberInvitationToken,
} from '@prisma/client';
import {
  ProjectMemberInvitationEntity,
  ProjectMemberInvitationTokenEntity,
} from 'core-domain';
import type {
  UpdatableProjectMemberInvitationEntityFields,
  Aggregates,
} from 'core-domain';
import dayjs from 'dayjs';
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

const mapToTokenEntity = (
  item: ProjectMemberInvitationToken & { invitation: ProjectMemberInvitation }
) =>
  new ProjectMemberInvitationTokenEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    expiredAt: item.expiredAt,
    invitation: mapToProjectMemberInvitationEntity(item.invitation),
  });

const mapToTokenEntityOrUndefined = (
  item:
    | (ProjectMemberInvitationToken & { invitation: ProjectMemberInvitation })
    | null
    | undefined
) => (item != null ? mapToTokenEntity(item) : undefined);

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
      } else if (item.isRegenerate) {
        return db.projectMemberInvitation
          .update({
            data: {
              ...mapFromEntity(item),
            },
            where: { id: item.id },
          })
          .then(mapToProjectMemberInvitationEntity);
      } else {
        return db.projectMemberInvitation
          .update({
            data: {
              ...mapFromEntity(item),
              ...(item.membershipId != null
                ? {
                    membership: {
                      connect: {
                        id: item.membershipId,
                      },
                    },
                  }
                : {}),
            },
            where: { id: item.id },
          })
          .then(mapToProjectMemberInvitationEntity);
      }
    },
    async findMany({ project, isInviting = true, ...args }) {
      const options = {
        where: {
          projectId: project?.id,
          ...(isInviting ? { membershipId: null } : {}),
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
    createToken(invitation) {
      return db.projectMemberInvitationToken
        .create({
          data: {
            invitation: {
              connect: {
                id: invitation.id,
              },
            },
            expiredAt: dayjs().add(1, 'day').toDate(),
          },
          include: {
            invitation: true,
          },
        })
        .then(mapToTokenEntity);
    },
    async findTokenBy(args) {
      return db.projectMemberInvitationToken
        .findFirst({
          where: {
            id: args.confirmationToken,
          },
          include: {
            invitation: true,
          },
        })
        .then(mapToTokenEntityOrUndefined);
    },
  };
