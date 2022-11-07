import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-record';

export const create: Aggregates['project']['create'] = input => {
  return pipe(
    input,
    ({
      __state,
      createdById,
      accountId,
      boardConfigId,
      boardStatusId,
      config,
      status,
      ...record
    }) => {
      return tryCatch(
        () =>
          db.project
            .create({
              data: {
                ...record,
                createdBy: {
                  connect: {
                    id: createdById,
                  },
                },
                account: {
                  connect: {
                    id: accountId,
                  },
                },
                projectMemberships: {
                  create: {
                    user: {
                      connect: {
                        id: createdById,
                      },
                    },
                    role: 'OWNER',
                  },
                },
                boardConfig: {
                  create: {
                    id: config.id,
                    initialVelocity: config.initialVelocity,
                    startOn: config.startOn,
                    startIterationOn: config.startIterationOn,
                    iterationLength: config.iterationLength,
                  },
                },
                boardStatus: {
                  create: {
                    id: status.id,
                    velocity: status.velocity,
                  },
                },
              },
              include: {
                boardConfig: true,
                boardStatus: true,
              },
            })
            .then(convertToEntity),
        handleError
      );
    }
  );
};
