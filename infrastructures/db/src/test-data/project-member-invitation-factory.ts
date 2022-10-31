import {
  ProjectMemberInvitationMutations,
  ProjectMemberInvitationTokenMutations,
  ProjectMemberInvitation_BuildInput,
  ProjectMemberInvitation_BuiltAttributes,
  ProjectMemberInvitation_ValidAttributes,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { db } from '..';
import { ProjectMemberInvitationTokenRepository } from '../repositories/project-member-invitation-token';
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
): Promise<ProjectMemberInvitation_ValidAttributes> => {
  const invitation = await buildTestProjectMemberInvitation(fields);
  const createdInvitation = await getOrThrow(
    db.projectMemberInvitation.create(invitation)
  );
  const token = await getOrThrow(
    ProjectMemberInvitationTokenMutations.build({
      invitation: createdInvitation,
    })
  );

  await getOrThrow(db.projectMemberInvitationToken.create(token));

  return createdInvitation;
};
