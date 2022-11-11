import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-member-invitation-record';
import { picker } from '../../lib/picker';

export const create: Aggregates['projectMemberInvitation']['create'] =
  input => {
    const { id, attributes } = picker(input);
    const { projectId, membershipId, ...columns } = attributes;
    return tryCatch(
      () =>
        db.projectMemberInvitation
          .create({
            data: {
              id,
              ...columns,
              project: {
                connect: {
                  id: projectId,
                },
              },
            },
          })
          .then(convertToEntity),
      handleError
    );
  };
