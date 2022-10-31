import {
  ProjectMemberInvitationMutations,
  ProjectMemberInvitationTokenMutations,
  ProjectMemberInvitationToken_ValidAttributes,
  ProjectMemberInvitation_BuildInput,
  ProjectMemberInvitation_BuiltAttributes,
  ProjectMemberInvitation_ValidAttributes,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { db } from '..';
import { getOrThrow } from './utils';

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
  invitation: ProjectMemberInvitation_ValidAttributes;
  token: ProjectMemberInvitationToken_ValidAttributes;
}> => {
  const invitationAttributes = await buildTestProjectMemberInvitation(fields);
  const invitation = await getOrThrow(
    db.projectMemberInvitation.create(invitationAttributes)
  );
  const tokenAttributes = await getOrThrow(
    ProjectMemberInvitationTokenMutations.build({
      invitation,
    })
  );

  const token = await getOrThrow(
    db.projectMemberInvitationToken.create(tokenAttributes)
  );

  return { invitation, token };
};
