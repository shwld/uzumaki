import { buildProjectMember } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { joinProjectMemberArgsValidationSchema } from './joinProjectMemberValidation';

export const joinProjectMember = createMutationResolver(
  'joinProjectMember',
  {
    validationSchema: joinProjectMemberArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const invitation = await context.db.projectMemberInvitation.findByToken({
        tokenId: args.input.tokenId,
      });
      if (invitation == null || invitation.isJoined()) return;

      return invitation;
    },
  },
  async ({ args, context }, invitation) => {
    const projectMember = await context.db.projectMember.findBy({
      userId: context.currentUser!.id,
      projectId: invitation.projectId,
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
      invitation,
      role: invitation.role,
    });
    const newProjectMember = await context.db.projectMember.save(member);
    return {
      __typename: 'JoinProjectMemberSuccessResult',
      result: newProjectMember,
    };
  }
);
