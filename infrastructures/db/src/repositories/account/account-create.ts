import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './account-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['account']['create'] = input => {
  const { id, attributes } = picker(input);
  const { createdById, ...columns } = attributes;
  return tryCatch(
    () =>
      db.account
        .create({
          data: {
            id,
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
