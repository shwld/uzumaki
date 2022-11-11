import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/id';
import { Either } from '../../../shared';
import { StoryMutations, Story_EditStateInput } from '.';
import { StoryPosition, Story_Attributes } from '../story-interfaces';

describe('edit state new project', async () => {
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
    const validInput: Story_EditStateInput = {
      state: 'STARTED',
    };
    test('can editState', async () => {
      const editState = StoryMutations.editState(validInput);
      const newStory = await editState(record)();
      expect(Either.isRight(newStory)).toBe(true);
      expect(Either.isRight(newStory) && newStory.right.position).eq(
        StoryPosition.CURRENT
      );
      expect(Either.isRight(newStory) && newStory.right.priority).eq(0);
    });
  });

  describe('case: accepted', async () => {
    const validInput: Story_EditStateInput = {
      state: 'ACCEPTED',
    };
    test('can editState', async () => {
      const editState = StoryMutations.editState(validInput);
      const newStory = await editState(record)();
      expect(Either.isRight(newStory)).toBe(true);
      expect(Either.isRight(newStory) && newStory.right.position).eq(
        StoryPosition.DONE
      );
      expect(Either.isRight(newStory) && newStory.right.priority).eq(0);
    });
  });
});
