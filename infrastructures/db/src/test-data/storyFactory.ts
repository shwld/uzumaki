import {
  buildStory,
  ProjectEntity,
  ProjectMemberEntity,
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
    requesterId: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    isDeleted: false,
    isUpdated: false,
    isMoved: false,
    ...fields,
  };
};

export const buildTestStory = (
  project: ProjectEntity,
  requester: ProjectMemberEntity,
  fields?: Partial<StoryEntityFields>
): StoryEntity => {
  return buildStory(project, {
    ...buildTestStoryAttributes(fields),
    requester,
  });
};

export const createTestStory = (
  project: ProjectEntity,
  requester: ProjectMemberEntity,
  fields?: Partial<StoryEntityFields>
): Promise<StoryEntity> => {
  const story = buildStory(project, {
    ...buildTestStoryAttributes(fields),
    requester,
  });

  return storyRepository.save(story);
};
