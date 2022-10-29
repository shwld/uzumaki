import { describe, expect, test } from 'vitest';
import { generateId } from '../../../lib/id';
import { Either } from '../../../lib/result';
import { StoryMutations } from '.';
import { Story_BuildInput } from './build-story';

describe('build new user', async () => {
  const validInput: Story_BuildInput = {
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
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = StoryMutations.build(validInput);
      const newStory = await build();
      expect(Either.isRight(newStory)).toBe(true);
      expect(Either.isRight(newStory) && newStory.right.title).eq('test story');
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: Story_BuildInput = {
        ...validInput,
        id: '',
      };
      const build = StoryMutations.build(invalidInput);
      const newStory = await build();
      expect(Either.isLeft(newStory)).toBe(true);
      expect(Either.isLeft(newStory) && newStory.left.message).toContain(
        'Validation Error'
      );
    });
  });
});
