import {
  ProjectMember_BuildInput,
  ProjectMemberInvitationEntity,
  UserEntity,
  ProjectMember_BuiltAttributes,
  ProjectMemberEntity,
  ProjectMemberMutations,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { db } from '..';
import { getOrThrow } from 'core-domain/lib';

export const buildTestProjectMember = async (
  invitation: ProjectMemberInvitationEntity,
  user: UserEntity,
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

export const createTestProjectMember = async (
  invitation: ProjectMemberInvitationEntity,
  user: UserEntity,
  fields?: Partial<ProjectMember_BuildInput>
): Promise<ProjectMemberEntity> => {
  const projectMember = await buildTestProjectMember(invitation, user, fields);

  return getOrThrow(db.projectMember.create(projectMember));
};
