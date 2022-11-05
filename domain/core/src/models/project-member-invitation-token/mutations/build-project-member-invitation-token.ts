import { InvalidAttributesError } from '../../../shared/error';
import type { ProjectMemberInvitationToken_Attributes } from '../project-member-invitation-token-interfaces';
import { ProjectMemberInvitationTokenValidator } from '../project-member-invitation-token-validator';
import { pipe, Result, map } from '../../../shared/result';
import { BuiltState, STATE_IS_BUILT } from '../../../shared/interfaces';
import { generateId } from '../../../shared';
import dayjs from 'dayjs';
import { ProjectMemberInvitationEntity } from '../../project-member-invitation/project-member-invitation-entity';

/**
 * Interfaces
 */
export interface ProjectMemberInvitationToken_BuildInput {
  invitation: ProjectMemberInvitationEntity;
}

export interface ProjectMemberInvitationToken_BuiltAttributes
  extends ProjectMemberInvitationToken_Attributes,
    BuiltState {}

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
      expiredAt: dayjs().add(1, 'day').toDate(),
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
