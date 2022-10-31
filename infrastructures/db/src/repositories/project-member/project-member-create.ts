import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['projectMember']['create'] = input => {
  const { attributes } = picker(input);
  const { createdByInvitationId, projectId, userId, ...columns } = attributes;
  return tryCatch(
    () =>
      db.projectMembership
        .create({
          data: {
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
        .then(convertToValidAttributes),
    handleError
  );
};
