import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { StoryMutations } from '.';
import { Story_Attributes } from '../story-interfaces';
import { STATE_IS_REMOVING } from '../../../shared/interfaces';

describe('remove new project', async () => {
  const record: Story_Attributes = {
    id: generateId(),
    title: 'test story',
    description: 'test description',
    state: 'ACCEPTED',
    kind: 'CHORE',
    points: 10,
    releaseDate: new Date(),
    position: 'BACKLOG',
    priority: 0,
    requesterId: generateId(),
    projectId: generateId(),
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const newStory = StoryMutations.remove(record);
    expect(newStory.__state).toBe(STATE_IS_REMOVING);
  });
});
