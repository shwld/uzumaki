import { InvalidAttributesError } from '../../../shared/error';
import type {
  InvitationTokenState,
  ProjectMemberInvitationToken_Attributes,
} from '../project-member-invitation-token-interfaces';
import { ProjectMemberInvitationTokenValidator } from '../project-member-invitation-token-validator';
import { pipe, Result, map } from '../../../shared';
import { BuiltState, ID, STATE_IS_BUILT } from '../../../shared/interfaces';
import { generateId } from '../../../shared';
import dayjs from 'dayjs';
import { ProjectMemberInvitationEntity } from '../../project-member-invitation/project-member-invitation-entity';

/**
 * Interfaces
 */
export interface ProjectMemberInvitationToken_BuildInput {
  invitation: ProjectMemberInvitationEntity;
  projectId: ID;
}

export interface ProjectMemberInvitationToken_BuiltAttributes
  extends ProjectMemberInvitationToken_Attributes,
    BuiltState {
  state: InvitationTokenState;
}

/**
 * Mutation
 */
export const build = (
  input: ProjectMemberInvitationToken_BuildInput
): Result<
  InvalidAttributesError,
  ProjectMemberInvitationToken_BuiltAttributes
> => {
  return pipe(
    {
      id: generateId(),
      invitationId: input.invitation.id,
      projectId: input.projectId,
      expiredAt: dayjs().add(1, 'day').toDate(),
      role: input.invitation.role,
      email: input.invitation.email,
      state: 'INVITING',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ProjectMemberInvitationTokenValidator.validate,
    map(v => ({
      ...v,
      __state: STATE_IS_BUILT,
    }))
  );
};
