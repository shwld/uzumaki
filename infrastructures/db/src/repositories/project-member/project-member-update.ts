import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-member-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['projectMember']['update'] = input => {
  const { id, attributes } = picker(input);
  const { projectId, userId, user, ...columns } = attributes;
  return tryCatch(
    () =>
      db.projectMembership
        .update({
          data: columns,
          where: { id },
          include: {
            user: true,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
