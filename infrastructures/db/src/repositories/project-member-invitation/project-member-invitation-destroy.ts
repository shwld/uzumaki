import { pipe, tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './project-member-invitation-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['projectMemberInvitation']['destroy'] =
  input => {
    const { id } = picker(input);
    return tryCatch(
      () =>
        db.projectMemberInvitation
          .delete({ where: { id } })
          .then(convertToEntity),
      handleError
    );
  };
