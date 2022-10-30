import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-invitation-record';

export const create: Aggregates['projectMemberInvitation']['create'] = attributes => {
  return pipe(attributes, ({ __state, ...record }) => {
    return tryCatch(
      () =>
        db.projectMemberInvitation
          .create({
            data: {
              ...record,
            },
          })
          .then(convertToValidAttributes),
      handleError
    );
  });
};
