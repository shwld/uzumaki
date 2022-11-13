import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-member-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['projectMember']['create'] = input => {
  const { id, attributes } = picker(input);
  const { createdByInvitationId, projectId, userId, user, ...columns } =
    attributes;
  return tryCatch(
    () =>
      db.projectMembership
        .create({
          data: {
            id,
            ...columns,
            project: {
              connect: {
                id: projectId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
            invitations: {
              connect: {
                id: createdByInvitationId,
              },
            },
          },
          include: {
            user: true,
          },
        })
        .then(convertToEntity),
    handleError
  );
};
