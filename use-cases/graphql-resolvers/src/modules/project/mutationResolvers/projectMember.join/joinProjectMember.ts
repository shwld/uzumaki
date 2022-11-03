import { buildProjectMember } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutation-helpers';
import { joinProjectMemberArgsValidationSchema } from './joinProjectMemberValidation';

export const joinProjectMember = createMutationResolver(
  'joinProjectMember',
  {
    validationSchema: joinProjectMemberArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const invitationToken =
        await context.db.projectMemberInvitation.findTokenBy({
          confirmationToken: args.input.confirmationToken,
        });
      return invitationToken;
    },
  },
  async ({ args, context }, invitationToken) => {
    if (invitationToken.invitation.isJoined()) {
      return {
        __typename: 'JoinProjectMemberTokenIsAlreadyUsedResult',
        result: invitationToken.invitation,
      };
    }
    if (invitationToken.isExpired()) {
      return {
        __typename: 'JoinProjectMemberTokenIsExpiredResult',
        expiredAt: invitationToken.expiredAt,
      };
    }
    const projectMember = await context.db.projectMember.findByUser({
      user: context.currentUser!,
      projectId: invitationToken.invitation.projectId,
    });

    if (projectMember != null) {
      return {
        __typename: 'JoinProjectMemberAlreadyJoinedResult',
        result: projectMember,
      };
    }

    const member = buildProjectMember({
      id: args.input.id,
      user: context.currentUser!,
      invitation: invitationToken.invitation,
      role: invitationToken.invitation.role,
    });
    const newProjectMember = await context.db.projectMember.save(member);
    return {
      __typename: 'JoinProjectMemberSuccessResult',
      result: newProjectMember,
    };
  }
);
