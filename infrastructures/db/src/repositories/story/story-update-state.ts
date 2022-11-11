import { tryCatch } from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { picker } from '../../lib/picker';
import { convertToEntity } from './story-record';

export const updateState: Aggregates['story']['updateState'] = input => {
  const { id, attributes } = picker(input);
  const { state, position, priority } = attributes;
  return tryCatch(async () => {
    await db.storyOrderPriority.update({
      data: {
        position,
        priority,
      },
      where: {
        storyId: id,
      },
    });
    const story = await db.story.update({
      data: {
        state,
      },
      where: {
        id,
      },
      include: {
        storyOrderPriority: true,
      },
    });

    return convertToEntity(story);
  }, handleError);
};
