import {
  AccountEntity,
  generateId,
  ProjectMutations,
  Project_BuildInput,
  Project_BuiltAttributes,
  ProjectEntity,
  UserEntity,
  ProjectMemberEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { db } from '..';
import { createTestAccount } from './account-factory';
import { getOrThrow } from 'core-domain/lib';

export const buildTestProject = async (
  account: AccountEntity,
  createdBy: UserEntity,
  fields?: Partial<Project_BuildInput>
): Promise<Project_BuiltAttributes> => {
  return await getOrThrow(
    ProjectMutations.build({
      id: generateId(),
      accountId: account.id,
      createdById: createdBy.id,
      name: faker.name.findName(),
      description: faker.lorem.text(),
      privacy: 'PRIVATE',
      ...fields,
    })
  );
};

export const createTestProject = async (
  account: AccountEntity,
  createdBy: UserEntity,
  fields?: Partial<Project_BuildInput>
): Promise<ProjectEntity> => {
  const project = await buildTestProject(account, createdBy, fields);

  return getOrThrow(db.project.create(project));
};

export const createTestProjectByUser = async (
  user: UserEntity
): Promise<{
  account: AccountEntity;
  project: ProjectEntity;
  member: ProjectMemberEntity;
}> => {
  const account = await createTestAccount(user);
  const project = await createTestProject(account, user);
  const member = await getOrThrow(
    db.projectMember.find({ projectId: project.id, userId: user.id })
  );

  return {
    account,
    project,
    member,
  };
};
