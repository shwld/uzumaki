import {
  ProjectMemberEntity,
  StoryEntity,
  StoryMutations,
  Story_BuildInput,
  Story_BuiltAttributes,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { getOrThrow } from 'core-domain/lib';
import { db } from '..';

export const buildTestStory = async (
  fields: Partial<Story_BuildInput> & {
    member: ProjectMemberEntity;
    requester: UserEntity;
  }
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
      completedAt: faker.datatype.datetime(),
      ...fields,
    })
  );
};

export const createTestStory = async (
  fields: Partial<Story_BuildInput> & {
    member: ProjectMemberEntity;
    requester: UserEntity;
  }
): Promise<StoryEntity> => {
  const story = await buildTestStory(fields);
  console.log(story);

  return getOrThrow(db.story.create(story));
};
