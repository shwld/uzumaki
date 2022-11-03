import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './account-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['account']['create'] = input => {
  const { attributes } = picker(input);
  const { createdById, ...columns } = attributes;
  return tryCatch(
    () =>
      db.account
        .create({
          data: {
            ...columns,
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
        .then(convertToEntity),
    handleError
  );
};
