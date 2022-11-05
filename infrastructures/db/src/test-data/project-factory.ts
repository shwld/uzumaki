import {
  AccountEntity,
  generateId,
  ProjectMemberInvitationTokenEntity,
  ProjectMemberEntity,
  ProjectMutations,
  Project_BuildInput,
  Project_BuiltAttributes,
  ProjectEntity,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { db } from '..';
import { createTestAccount } from './account-factory';
import { createTestProjectMemberInvitationWithToken } from './project-member-invitation-factory';
import { createTestProjectMember } from './project-member-factory';
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
  projectMemberInvitationToken: ProjectMemberInvitationTokenEntity;
  projectMember: ProjectMemberEntity;
}> => {
  const account = await createTestAccount(user);
  const project = await createTestProject(account, user);
  const { invitation, token } =
    await createTestProjectMemberInvitationWithToken(project);
  const projectMember = await createTestProjectMember(invitation, user);

  return {
    account,
    project,
    projectMemberInvitationToken: token,
    projectMember,
  };
};
