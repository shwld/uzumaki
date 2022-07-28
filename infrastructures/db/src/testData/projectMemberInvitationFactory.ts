import {
  buildProjectMemberInvitation,
  ProjectEntity,
  ProjectMemberInvitationEntity,
  ProjectMemberInvitationEntityFields,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { projectMemberInvitationRepository } from '../repositories/projectMemberInvitationRepository';

export const buildTestProjectMemberInvitationAttributes = (
  fields?: Partial<ProjectMemberInvitationEntityFields>
): ProjectMemberInvitationEntityFields => {
  return {
    id: faker.datatype.uuid(),
    projectId: faker.datatype.uuid(),
    membershipId: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    email: faker.internet.email(),
    role: 'OWNER',
    isRegenerate: false,
    isDeleted: false,
    isUpdated: false,
    ...fields,
  };
};

export const buildTestProjectMemberInvitation = (
  project: ProjectEntity,
  fields?: Partial<ProjectMemberInvitationEntityFields>
): ProjectMemberInvitationEntity => {
  return buildProjectMemberInvitation({
    ...buildTestProjectMemberInvitationAttributes(fields),
    project,
  });
};

export const createTestProjectMemberInvitation = (
  project: ProjectEntity,
  fields?: Partial<ProjectMemberInvitationEntityFields>
): Promise<ProjectMemberInvitationEntity> => {
  const projectMember = buildProjectMemberInvitation({
    ...buildTestProjectMemberInvitationAttributes(fields),
    project,
  });

  return projectMemberInvitationRepository.save(projectMember);
};
