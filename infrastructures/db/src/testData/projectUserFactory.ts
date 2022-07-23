import {
  buildProjectUser,
  ProjectEntity,
  ProjectUserEntity,
  ProjectUserEntityFields,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { projectUserRepository } from '../repositories/projectUserRepository';

export const buildTestProjectUserAttributes = (
  fields?: Partial<ProjectUserEntityFields>
): ProjectUserEntityFields => {
  return {
    projectId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: faker.name.findName(),
    role: 'OWNER',
    avatarImageUrl: faker.internet.url(),
    isDeleted: false,
    isUpdated: false,
    ...fields,
  };
};

export const buildTestProjectUser = (
  project: ProjectEntity,
  user: UserEntity,
  fields?: Partial<ProjectUserEntityFields>
): ProjectUserEntity => {
  return buildProjectUser({
    ...buildTestProjectUserAttributes(fields),
    project,
    user,
  });
};

export const createTestProjectUser = (
  project: ProjectEntity,
  user: UserEntity,
  fields?: Partial<ProjectUserEntityFields>
): Promise<ProjectUserEntity> => {
  const projectUser = buildProjectUser({
    ...buildTestProjectUserAttributes(fields),
    project,
    user,
  });

  return projectUserRepository.save(projectUser);
};
