import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-invitation-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['projectMemberInvitation']['destroy'] = attributes => {
  return pipe(attributes, args => {
    const { id } = picker(args);
    return tryCatch(
      () => db.projectMemberInvitation.delete({ where: { id } }).then(convertToValidAttributes),
      handleError
    );
  });
};
