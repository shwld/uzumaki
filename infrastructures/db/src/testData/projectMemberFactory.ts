import {
  buildProjectMember,
  ProjectEntity,
  ProjectMemberEntity,
  ProjectMemberEntityFields,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { projectMemberRepository } from '../repositories/projectMemberRepository';

export const buildTestProjectMemberAttributes = (
  fields?: Partial<ProjectMemberEntityFields>
): ProjectMemberEntityFields => {
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

export const buildTestProjectMember = (
  project: ProjectEntity,
  user: UserEntity,
  fields?: Partial<ProjectMemberEntityFields>
): ProjectMemberEntity => {
  return buildProjectMember({
    ...buildTestProjectMemberAttributes(fields),
    project,
    user,
  });
};

export const createTestProjectMember = (
  project: ProjectEntity,
  user: UserEntity,
  fields?: Partial<ProjectMemberEntityFields>
): Promise<ProjectMemberEntity> => {
  const projectMember = buildProjectMember({
    ...buildTestProjectMemberAttributes(fields),
    project,
    user,
  });

  return projectMemberRepository.save(projectMember);
};
