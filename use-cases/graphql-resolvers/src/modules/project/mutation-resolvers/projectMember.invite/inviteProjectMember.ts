// import { buildProjectMemberInvitation } from 'core-domain';
// import { createMutationResolver } from '../../../../shared/helpers/mutation-helpers';
// import { inviteProjectMemberArgsValidationSchema } from './inviteProjectMemberValidation';

// export const inviteProjectMember = createMutationResolver(
// 'inviteProjectMember',
// {
//   validationSchema: inviteProjectMemberArgsValidationSchema,
//   async authorize({ args, context }) {
//     if (context.currentUser == null) return;

//     const project = await context.db.project.findByUser({
//       id: args.input.projectId,
//       user: context.currentUser,
//     });
//     if (project == null) return;

//     return project;
//   },
// },
// async ({ args, context }, project) => {
const projectMemberInvitation = buildProjectMemberInvitation({
  id: args.input.id,
  project,
  email: args.input.userEmail,
  role: args.input.role,
});
const invitation = await context.db.projectMemberInvitation.save(
  projectMemberInvitation
);
const token = await context.db.projectMemberInvitation.createToken(invitation);

//   const result = await context.mailer.send({
//     from: 'test@example.com',
//     to: invitation.email,
//     subject: `I've added you to "${project.name}" on Tracker`,
//     body: `http://localhost:5000/projects/${project.id}/invitations/${token.confirmationToken}}`,
//   });
//   return {
//     __typename: 'InviteProjectMemberSuccessResult',
//     result: projectMemberInvitation,
//   };
// }
// );

import {
  ProjectMemberInvitationMutations,
  ProjectMemberInvitationTokenMutations,
  ProjectPolicy,
} from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { inviteProjectMemberArgsValidationSchema } from './invite-project-member-validation';

export const inviteProjectMember: Required<MutationResolvers>['inviteProjectMember'] =
  async (parent, args, context, info) => {
    const result = await pipe(
      context.db.project.find({ id: args.input.projectId }),
      map(project => ({
        parent,
        args,
        context,
        info,
        project,
        user: context.currentUser,
      })),
      andThen(ProjectPolicy(context.db).authorizeUpdating),
      andThen(validateArguments(inviteProjectMemberArgsValidationSchema)),
      map(it => ({
        id: it.args.input.id,
        projectId: it.project.id,
        role: it.args.input.role,
        email: it.args.input.userEmail,
      })),
      andThen(ProjectMemberInvitationMutations.build),
      andThen(context.db.projectMemberInvitation.create),
      andThen(invitation => {
        return pipe(
          { invitation },
          ProjectMemberInvitationTokenMutations.build,
          andThen(context.db.projectMemberInvitationToken.create),
          map(token => ({
            invitation,
            token,
          }))
        );
      }),
      map(
        it =>
          ({
            __typename: 'InviteProjectMemberSuccessResult',
            result: it.invitation,
          } as const)
      ),
      handleError,
      resolve
    );

    return result;
  };
