import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { StoryEntity } from './entity';

describe('initialize', async () => {
  const story = new StoryEntity({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),

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
  });

  test('property is correct', async () => {
    expect(story.title).eq('test story');
  });
});
