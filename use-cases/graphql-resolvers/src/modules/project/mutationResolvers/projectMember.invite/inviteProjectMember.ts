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
    await context.db.projectMemberInvitation.save(projectMemberInvitation);

    const result = await context.mailer.send({
      from: 'test@example.com',
      to: 'shu.account@outlook.com',
      subject: 'test',
      body: 'test',
    });
    console.log(result);
    return {
      __typename: 'InviteProjectMemberSuccessResult',
      result: projectMemberInvitation,
    };
  }
);
