import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-invitation-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['projectMemberInvitation']['update'] =
  attributes => {
    return pipe(attributes, args => {
      const { id, attributes } = picker(args);
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
            .then(convertToValidAttributes),
        handleError
      );
    });
  };
