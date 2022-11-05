import {
  StoryEntity,
  StoryMutations,
  Story_BuildInput,
  Story_BuiltAttributes,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { getOrThrow } from 'core-domain/lib';
import { db } from '..';

export const buildTestStory = async (
  fields?: Partial<Story_BuildInput>
): Promise<Story_BuiltAttributes> => {
  return await getOrThrow(
    StoryMutations.build({
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
      completedAt: faker.datatype.datetime(),
      ...fields,
    })
  );
};

export const createTestStory = async (
  fields?: Partial<Story_BuildInput>
): Promise<StoryEntity> => {
  const story = await buildTestStory(fields);

  return getOrThrow(db.story.create(story));
};
