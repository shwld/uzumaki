import {
  buildStory,
  ProjectEntity,
  StoryEntity,
  StoryEntityFields,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { storyRepository } from '../repositories/storyRepository';

export const buildTestStoryAttributes = (
  fields?: Partial<StoryEntityFields>
): StoryEntityFields => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.slug(),
    description: faker.lorem.text(),
    state: 'UNSTARTED',
    kind: 'CHORE',
    points: faker.datatype.number(),
    releaseDate: faker.datatype.datetime(),
    position: 'DONE',
    priority: faker.datatype.number(),
    projectId: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...fields,
  };
};

export const buildTestStory = (
  project: ProjectEntity,
  fields?: Partial<StoryEntityFields>
): StoryEntity => {
  return buildStory({
    ...buildTestStoryAttributes(fields),
    project,
  });
};

export const createTestStory = (
  project: ProjectEntity,
  fields?: Partial<StoryEntityFields>
): Promise<StoryEntity> => {
  const story = buildStory({
    ...buildTestStoryAttributes(fields),
    project,
  });

  return storyRepository.create(story);
};
