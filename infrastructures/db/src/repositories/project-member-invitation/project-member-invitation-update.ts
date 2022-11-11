import { pipe, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-member-invitation-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['projectMemberInvitation']['update'] =
  input => {
    const { id, attributes } = picker(input);
    const { projectId, membershipId, ...record } = attributes;
    return tryCatch(
      () =>
        db.projectMemberInvitation
          .update({
            data: {
              ...record,
              ...(membershipId != null
                ? {
                    membership: {
                      connect: {
                        id: membershipId,
                      },
                    },
                  }
                : {}),
            },
            where: { id },
          })
          .then(convertToEntity),
      handleError
    );
  };
