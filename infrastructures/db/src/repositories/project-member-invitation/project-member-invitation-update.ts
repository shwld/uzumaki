import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-invitation-record';
import { picker } from '../../lib/picker';

export const update: Aggregates['projectMemberInvitation']['update'] = attributes => {
  return pipe(attributes, args => {
    const { id, attributes } = picker(args);
    return tryCatch(
      () =>
        db.projectMemberInvitation
          .update({
            data: attributes,
            where: { id },
          })
          .then(convertToValidAttributes),
      handleError
    );
  });
};
