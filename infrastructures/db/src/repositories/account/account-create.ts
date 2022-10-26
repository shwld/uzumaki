import { pipe, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './account-record';

export const create: Aggregates['account']['create'] = attributes => {
  return pipe(attributes, ({ __state, createdById, ...record }) => {
    return tryCatch(
      () =>
        db.account
          .create({
            data: {
              ...record,
              createdBy: {
                connect: {
                  id: createdById,
                },
              },
              accountMemberships: {
                create: {
                  role: 'OWNER',
                  user: {
                    connect: {
                      id: createdById,
                    },
                  },
                },
              },
            },
          })
          .then(convertToValidAttributes),
      handleError
    );
  });
};
