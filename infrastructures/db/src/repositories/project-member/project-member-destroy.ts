import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['projectMember']['destroy'] = input => {
  const { id } = picker(input);
  return tryCatch(
    () =>
      db.projectMembership
        .delete({
          where: { id },
          include: {
            user: true,
          },
        })
        .then(convertToValidAttributes),
    handleError
  );
};
