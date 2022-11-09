import { tryCatch } from 'core-domain/lib';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../../lib/db';
import { picker } from '../../lib/picker';
import { convertToEntity } from './story-record';

export const moveMany: Aggregates['story']['moveMany'] = inputList => {
  const promises = inputList.map(input => {
    const { id, attributes } = picker(input);
    const { position, priority } = attributes;
    return db.storyOrderPriority.update({
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
  });
  return tryCatch(async () => {
    const stories = await Promise.all(promises);
    return stories.map(storyOrderPriority =>
      convertToEntity({
        ...storyOrderPriority.story,
        storyOrderPriority,
      })
    );
  }, handleError);
};
