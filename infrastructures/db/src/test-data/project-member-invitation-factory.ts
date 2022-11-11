import {
  ProjectMemberInvitationMutations,
  ProjectMemberInvitationTokenMutations,
  ProjectMemberInvitationTokenEntity,
  ProjectMemberInvitation_BuildInput,
  ProjectMemberInvitation_BuiltAttributes,
  ProjectMemberInvitationEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { db } from '..';
import { getOrThrow } from 'core-domain';

export const buildTestProjectMemberInvitation = async (
  fields?: Partial<ProjectMemberInvitation_BuildInput>
): Promise<ProjectMemberInvitation_BuiltAttributes> => {
  const build = ProjectMemberInvitationMutations.build({
    id: faker.datatype.uuid(),
    projectId: faker.datatype.uuid(),
    email: faker.internet.email(),
    role: 'OWNER',
    ...fields,
  });
  return getOrThrow(build);
};

export const createTestProjectMemberInvitationWithToken = async (
  fields?: Partial<ProjectMemberInvitation_BuildInput>
): Promise<{
  invitation: ProjectMemberInvitationEntity;
  token: ProjectMemberInvitationTokenEntity;
}> => {
  const invitationAttributes = await buildTestProjectMemberInvitation(fields);
  const invitation = await getOrThrow(
    db.projectMemberInvitation.create(invitationAttributes)
  );
  const tokenAttributes = await getOrThrow(
    ProjectMemberInvitationTokenMutations.build({
      invitation,
      projectId: invitation.projectId,
    })
  );

  const token = await getOrThrow(
    db.projectMemberInvitationToken.create(tokenAttributes)
  );

  return { invitation, token };
};
