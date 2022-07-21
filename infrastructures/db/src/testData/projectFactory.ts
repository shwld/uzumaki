import {
  AccountEntity,
  buildProject,
  ProjectEntity,
  ProjectEntityFields,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { projectRepository } from '../repositories/projectRepository';

export const buildTestProjectAttributes = (
  fields?: Partial<ProjectEntityFields>
): ProjectEntityFields => {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: faker.name.findName(),
    description: faker.lorem.text(),
    privacy: 'PRIVATE',
    currentVelocity: faker.datatype.number(),
    accountId: faker.datatype.uuid(),
    isDeleted: false,
    isUpdated: false,
    ...fields,
  };
};

export const buildTestProject = (
  account: AccountEntity,
  fields?: Partial<ProjectEntityFields>
): ProjectEntity => {
  return buildProject({
    ...buildTestProjectAttributes(fields),
    account,
  });
};

export const createTestProject = (
  account: AccountEntity,
  fields?: Partial<ProjectEntityFields>
): Promise<ProjectEntity> => {
  const project = buildProject({
    account,
    ...buildTestProjectAttributes(fields),
  });

  return projectRepository.save(project);
};
