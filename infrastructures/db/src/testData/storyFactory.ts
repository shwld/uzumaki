import { buildStory, StoryEntity, StoryEntityFields } from 'core-domain';
import { faker } from '@faker-js/faker';
import { storyRepository } from '../repositories/storyRepository';

export const buildTestStoryAttributes = (
  fields?: Partial<StoryEntityFields>
): StoryEntityFields => {
  return {
    id: faker.random.alpha(10),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...fields,
  };
};

export const buildTestStory = (
  fields?: Partial<StoryEntityFields>
): StoryEntity => {
  return buildStory({
    ...buildTestStoryAttributes(fields),
  });
};

export const createTestStory = (
  fields?: Partial<StoryEntityFields>
): Promise<StoryEntity> => {
  const story = buildStory({
    ...buildTestStoryAttributes(fields),
  });

  return storyRepository.create(story);
};
