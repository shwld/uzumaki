import {
  Project,
  ProjectBoardConfig,
  ProjectBoardStatus,
} from '@prisma/client';
import {
  ProjectBoardConfigEntity,
  ProjectBoardStatusEntity,
  ProjectEntity,
} from 'core-domain';
import type { UpdatableProjectEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToProjectEntity = (
  item: Project & {
    isDeleted?: boolean;
    boardConfig: ProjectBoardConfig;
    boardStatus: ProjectBoardStatus;
  }
) => {
  return new ProjectEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    name: item.name,
    description: item.description,
    privacy: item.privacy,
    accountId: item.accountId,
    createdById: item.createdById ?? undefined,
    isDeleted: item.isDeleted,
    boardConfigId: item.boardConfigId,
    boardConfig: new ProjectBoardConfigEntity({
      id: item.boardConfig.id,
      initialVelocity: item.boardConfig.initialVelocity,
      startOn: item.boardConfig.startOn ?? undefined,
      startIterationOn: item.boardConfig.startIterationOn,
      iterationLength: item.boardConfig.iterationLength,
      createdAt: item.boardConfig.createdAt,
      updatedAt: item.boardConfig.updatedAt,
    }),
    boardStatusId: item.boardStatusId,
    boardStatus: new ProjectBoardStatusEntity({
      id: item.boardStatus.id,
      velocity: item.boardStatus.velocity,
      createdAt: item.boardStatus.createdAt,
      updatedAt: item.boardStatus.updatedAt,
    }),
  });
};
const mapToDeletedProjectEntity = (
  item: Project & {
    boardConfig: ProjectBoardConfig;
    boardStatus: ProjectBoardStatus;
  }
): ProjectEntity => {
  return mapToProjectEntity({ ...item, isDeleted: true });
};
const mapToProjectEntityOrUndefined = (
  item:
    | (Project & {
        boardConfig: ProjectBoardConfig;
        boardStatus: ProjectBoardStatus;
      })
    | null
    | undefined
) => (item != null ? mapToProjectEntity(item) : undefined);

const mapFromEntity = (item: ProjectEntity): UpdatableProjectEntityFields => ({
  name: item.name,
  description: item.description,
  privacy: item.privacy,
});

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
            unaccountedMembers: {
              create: {
                user: {
                  connect: {
                    id: item.createdById,
                  },
                },
                role: 'OWNER',
              },
            },
            boardConfig: {
              create: {
                initialVelocity: item.boardConfig.initialVelocity,
                startOn: item.boardConfig.startOn,
                startIterationOn: item.boardConfig.startIterationOn,
                iterationLength: item.boardConfig.iterationLength,
              },
            },
            boardStatus: {
              create: {
                velocity: item.boardConfig.initialVelocity,
              },
            },
          },
          include: {
            boardConfig: true,
            boardStatus: true,
          },
        })
        .then(mapToProjectEntity);
    } else if (item.isDeleted) {
      return db.project
        .delete({
          where: { id: item.id },
          include: {
            boardConfig: true,
            boardStatus: true,
          },
        })
        .then(mapToDeletedProjectEntity);
    } else {
      return db.project
        .update({
          data: mapFromEntity(item),
          where: { id: item.id },
          include: {
            boardConfig: true,
            boardStatus: true,
          },
        })
        .then(mapToProjectEntity);
    }
  },
  async findMany({ account, ...args }) {
    const options = {
      where: {
        accountId: account?.id,
      },
    };
    const totalCount = await db.project.aggregate({
      ...options,
      _count: true,
    });
    return db.project
      .findMany({
        ...options,
        ...args,
        include: {
          boardConfig: true,
          boardStatus: true,
        },
      })
      .then(items => ({
        nodes: items.map(mapToProjectEntity),
        totalCount: totalCount._count,
      }));
  },
  findBy(args) {
    return db.project
      .findFirst({
        where: { id: args.id, accountId: args.account?.id },
        include: {
          boardConfig: true,
          boardStatus: true,
        },
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
        include: {
          boardConfig: true,
          boardStatus: true,
        },
      })
      .then(mapToProjectEntityOrUndefined);
  },
};
