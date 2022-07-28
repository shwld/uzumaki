import {
  buildProjectMember,
  ProjectMemberEntity,
  ProjectMemberEntityFields,
  ProjectMemberInvitationEntity,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { projectMemberRepository } from '../repositories/projectMemberRepository';

export const buildTestProjectMemberAttributes = (
  fields?: Partial<ProjectMemberEntityFields>
): ProjectMemberEntityFields => {
  return {
    id: faker.datatype.uuid(),
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

export const buildTestProjectMember = (
  invitation: ProjectMemberInvitationEntity,
  user: UserEntity,
  fields?: Partial<ProjectMemberEntityFields>
): ProjectMemberEntity => {
  return buildProjectMember({
    ...buildTestProjectMemberAttributes(fields),
    invitation,
    user,
  });
};

export const createTestProjectMember = (
  invitation: ProjectMemberInvitationEntity,
  user: UserEntity,
  fields?: Partial<ProjectMemberEntityFields>
): Promise<ProjectMemberEntity> => {
  const projectMember = buildProjectMember({
    ...buildTestProjectMemberAttributes(fields),
    invitation,
    user,
  });

  return projectMemberRepository.save(projectMember);
};
