import { buildProjectMemberInvitation } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { inviteProjectMemberArgsValidationSchema } from './inviteProjectMemberValidation';

export const inviteProjectMember = createMutationResolver(
  'inviteProjectMember',
  {
    validationSchema: inviteProjectMemberArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const project = await context.db.project.findByUser({
        id: args.input.projectId,
        user: context.currentUser,
      });
      if (project == null) return;

      return project;
    },
  },
  async ({ args, context }, project) => {
    const projectMemberInvitation = buildProjectMemberInvitation({
      id: args.input.id,
      project,
      email: args.input.userEmail,
      role: args.input.role,
    });
    const invitation = await context.db.projectMemberInvitation.save(
      projectMemberInvitation
    );
    const token = await context.db.projectMemberInvitation.createToken(
      invitation
    );

    const result = await context.mailer.send({
      from: 'test@example.com',
      to: invitation.email,
      subject: `I've added you to "${project.name}" on Tracker`,
      body: `http://localhost:5000/projects/${project.id}/invitations/${token.confirmationToken}}`,
    });
    return {
      __typename: 'InviteProjectMemberSuccessResult',
      result: projectMemberInvitation,
    };
  }
);
