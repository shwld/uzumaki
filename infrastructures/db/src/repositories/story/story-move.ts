import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { picker } from '../../lib/picker';
import { convertToEntity } from './story-record';

export const move: Aggregates['story']['move'] = input => {
  const { id, attributes } = picker(input);
  const { position, priority } = attributes;
  return tryCatch(async () => {
    const storyOrderPriority = await db.storyOrderPriority.update({
      data: {
        position,
        priority,
      },
      where: {
        storyId: id,
      },
      include: {
        story: true,
      },
    });

    return convertToEntity({
      ...storyOrderPriority.story,
      storyOrderPriority,
    });
  }, handleError);
};
