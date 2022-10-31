import {
  ProjectMember_BuildInput,
  ProjectMemberInvitation_Attributes,
  User_Attributes,
  ProjectMember_BuiltAttributes,
  ProjectMember_ValidAttributes,
  ProjectMemberMutations,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { ProjectMemberRepository } from '../repositories/project-member-repository';
import { getOrThrow } from './utils';

export const buildTestProjectMember = async (
  invitation: ProjectMemberInvitation_Attributes,
  user: User_Attributes,
  fields?: Partial<ProjectMember_BuildInput>
): Promise<ProjectMember_BuiltAttributes> => {
  const build = ProjectMemberMutations.build({
    id: faker.datatype.uuid(),
    projectId: invitation.projectId,
    createdByInvitationId: invitation.id,
    role: 'OWNER',
    ...fields,
  });
  return getOrThrow(build(user));
};

export const createTestProjectMember = (
  invitation: ProjectMemberInvitation_Attributes,
  user: User_Attributes,
  fields?: Partial<ProjectMember_BuildInput>
): Promise<ProjectMember_ValidAttributes> => {
  const projectMember = buildTestProjectMember(invitation, user, fields);

  return ProjectMemberRepository.save(projectMember);
};
