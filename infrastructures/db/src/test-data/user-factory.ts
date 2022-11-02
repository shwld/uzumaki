import { faker } from '@faker-js/faker';
import {
  UserMutations,
  User_BuildInput,
  User_BuiltAttributes,
  User_ValidAttributes,
} from 'core-domain';
import { getOrThrow } from 'core-domain/lib';
import { db } from '..';

export const buildTestUser = async (
  fields?: Partial<User_BuildInput>
): Promise<User_BuiltAttributes> => {
  return await getOrThrow(
    UserMutations.build({
      id: faker.datatype.uuid(),
      uid: faker.random.alpha(10),
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatarImageUrl: faker.internet.url(),
      ...fields,
    })
  );
};

export const createTestUser = async (
  fields?: Partial<User_BuildInput>
): Promise<User_ValidAttributes> => {
  const userAttributes = await buildTestUser(fields);

  return getOrThrow(db.user.create(userAttributes));
};
