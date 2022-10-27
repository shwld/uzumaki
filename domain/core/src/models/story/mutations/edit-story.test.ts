import { describe, expect, test } from 'vitest';
import { generateId } from '../../../shared/entity';
import { Either } from '../../../shared/functional';
import { StoryMutations } from '.';
import type { Story_EditInput } from '.';
import { Story_Attributes } from '../story-interfaces';

describe('edit new project', async () => {
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
  const validInput: Story_EditInput = {
    title: 'new story',
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const edit = StoryMutations.edit(validInput);
      const newStory = await edit(record)();
      expect(Either.isRight(newStory)).toBe(true);
      expect(Either.isRight(newStory) && newStory.right.title).eq('new story');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const invalidInput: Story_EditInput = {
        ...validInput,
        points: -1,
      };
      const edit = StoryMutations.edit(invalidInput);
      const newStory = await edit(record)();
      expect(Either.isLeft(newStory)).toBe(true);
      expect(Either.isLeft(newStory) && newStory.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
