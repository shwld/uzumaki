import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './user-record';

export const update: Aggregates['user']['update'] = input => {
  const { id, ...attributes } = input;
  return tryCatch(
    () =>
      db.user
        .update({
          data: {
            name: attributes.name,
            avatarImageUrl: attributes.avatarImageUrl,
          },
          where: { id },
        })
        .then(convertToEntity),
    handleError
  );
};
