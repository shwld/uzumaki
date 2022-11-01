import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared/result';
import { StoryMutations, Story_MoveInput } from '.';
import { StoryPosition, Story_Attributes } from '../story-interfaces';

describe('move state new project', async () => {
  const record: Story_Attributes = {
    id: generateId(),
    title: 'test story',
    description: 'test description',
    state: 'UNSTARTED',
    kind: 'CHORE',
    points: 10,
    releaseDate: new Date(),
    position: 'BACKLOG',
    priority: 2,
    requesterId: generateId(),
    projectId: generateId(),
    completedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  describe('case: started', async () => {
    const validInput: Story_MoveInput = {
      position: 'CURRENT',
      priority: 1,
    };
    test('can move', async () => {
      const move = StoryMutations.move(validInput);
      const newStory = await move(record)();
      expect(Either.isRight(newStory)).toBe(true);
      expect(Either.isRight(newStory) && newStory.right.position).eq(
        StoryPosition.CURRENT
      );
      expect(Either.isRight(newStory) && newStory.right.priority).eq(1);
    });
  });

  describe('case: invalid state', async () => {
    const currentPositionRecord: Story_Attributes = {
      ...record,
      state: 'STARTED',
      position: 'CURRENT',
    };
    const validInput: Story_MoveInput = {
      position: 'BACKLOG',
      priority: 1,
    };
    test('can move', async () => {
      const move = StoryMutations.move(validInput);
      const newStory = await move(currentPositionRecord)();
      expect(Either.isLeft(newStory)).toBe(true);
      expect(Either.isLeft(newStory) && newStory.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
