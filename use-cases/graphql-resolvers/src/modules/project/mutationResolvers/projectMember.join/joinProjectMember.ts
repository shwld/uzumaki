import { buildProjectMember } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { joinProjectMemberArgsValidationSchema } from './joinProjectMemberValidation';

export const joinProjectMember = createMutationResolver(
  'joinProjectMember',
  {
    validationSchema: joinProjectMemberArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const invitation = await context.db.projectMemberInvitation.findBy({
        id: args.input.projectMemberInvitationId,
      });

      if (invitation == null) return;
      if (invitation.email !== context.currentUser.email) return;

      return invitation;
    },
  },
  async ({ args, context }, invitation) => {
    const projectMember = await context.db.projectMember.save(
      buildProjectMember({
        id: args.input.id,
        user: context.currentUser!,
        invitation,
        role: invitation.role,
      })
    );
    return {
      __typename: 'JoinProjectMemberSuccessResult',
      result: projectMember,
    };
  }
);
