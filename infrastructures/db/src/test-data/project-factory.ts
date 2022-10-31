import {
  AccountEntity,
  Account_Attributes,
  ProjectMemberEntity,
  ProjectMemberInvitationTokenEntity,
  Project_BuildInput,
  Project_BuiltAttributes,
  UserEntity,
  User_Attributes,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { projectRepository } from '../repositories/projectRepository';
import { createTestAccount } from './account-factory';
import { createTestProjectMemberInvitationWithToken } from './project-member-invitation-factory';
import { createTestProjectMember } from './project-member-factory';

export const buildTestProject = (
  account: Account_Attributes,
  createdBy: User_Attributes,
  fields?: Partial<Project_BuildInput>
): Project_BuiltAttributes => {
  const boardConfigId = faker.datatype.uuid();
  const boardStatusId = faker.datatype.uuid();
  return {
    __state: 'Built',
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: faker.name.findName(),
    description: faker.lorem.text(),
    privacy: 'PRIVATE',
    ...fields,
    accountId: account.id,
    createdById: createdBy.id,
    boardConfigId,
    boardStatusId,
    config: {
      id: boardConfigId,
      initialVelocity: 10,
      startOn: faker.date.past(),
      startIterationOn: 'MONDAY',
      iterationLength: 2,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    },
    status: {
      id: boardStatusId,
      velocity: 10,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    },
  };
};

export const createTestProject = (
  account: AccountEntity,
  createdBy: UserEntity,
  fields?: Partial<Project_BuildInput>
): Promise<ProjectEntity> => {
  const project = buildProject({
    account,
    ...buildTestProjectAttributes(fields),
    createdBy,
  });

  return projectRepository.save(project);
};

export const createTestProjectByUser = async (
  user: UserEntity
): Promise<{
  account: AccountEntity;
  project: ProjectEntity;
  projectMemberInvitationToken: ProjectMemberInvitationTokenEntity;
  projectMember: ProjectMemberEntity;
}> => {
  const account = await createTestAccount(user);
  const project = await createTestProject(account, user);
  const projectMemberInvitationToken =
    await createTestProjectMemberInvitationWithToken(project);
  const projectMember = await createTestProjectMember(
    projectMemberInvitationToken.invitation,
    user
  );

  return {
    account,
    project,
    projectMemberInvitationToken,
    projectMember,
  };
};
