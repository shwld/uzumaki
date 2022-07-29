import {
  AccountEntity,
  buildProject,
  ProjectEntity,
  ProjectEntityFields,
  ProjectMemberEntity,
  ProjectMemberInvitationTokenEntity,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { projectRepository } from '../repositories/projectRepository';
import { createTestAccount } from './accountFactory';
import { createTestProjectMemberInvitationWithToken } from './projectMemberInvitationFactory';
import { createTestProjectMember } from './projectMemberFactory';

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
  createdBy: UserEntity,
  fields?: Partial<ProjectEntityFields>
): ProjectEntity => {
  return buildProject({
    ...buildTestProjectAttributes(fields),
    account,
    createdBy,
  });
};

export const createTestProject = (
  account: AccountEntity,
  createdBy: UserEntity,
  fields?: Partial<ProjectEntityFields>
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
