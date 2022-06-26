import { buildUser, UserEntity, UserEntityFields } from 'core-domain';
import { faker } from '@faker-js/faker';
import { userRepository } from '../repositories/userRepository';

export const buildTestUserAttributes = (
  fields?: Partial<UserEntityFields>
): UserEntityFields => {
  return {
    id: faker.random.alpha(10),
    name: faker.name.findName(),
    email: faker.internet.email(),
    picture: faker.internet.url(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    ...fields,
  };
};

export const buildTestUser = (
  fields?: Partial<UserEntityFields>
): UserEntity => {
  return buildUser({
    ...buildTestUserAttributes(fields),
  });
};

export const createTestUser = (
  fields?: Partial<UserEntityFields>
): Promise<UserEntity> => {
  const user = buildUser({
    ...buildTestUserAttributes(fields),
  });

  return userRepository.create(user);
};