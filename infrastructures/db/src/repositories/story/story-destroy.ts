import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { convertToEntity } from './story-record';
import { picker } from '../../lib/picker';

export const destroy: Aggregates['story']['destroy'] = input => {
  const { id } = picker(input);
  return tryCatch(
    () =>
      db.story
        .delete({ where: { id }, include: { storyOrderPriority: true } })
        .then(convertToEntity),
    handleError
  );
};
