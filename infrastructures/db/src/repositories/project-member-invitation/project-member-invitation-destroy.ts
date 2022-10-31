import { pipe, tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToValidAttributes } from './project-member-invitation-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['projectMemberInvitation']['destroy'] =
  input => {
    const { id } = picker(input);
    return tryCatch(
      () =>
        db.projectMemberInvitation
          .delete({ where: { id } })
          .then(convertToValidAttributes),
      handleError
    );
  };
