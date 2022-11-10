import {
  ProjectMemberInvitationMutations,
  ProjectMemberInvitationTokenMutations,
  ProjectPolicy,
} from 'core-domain';
import { andThen, map, resolve, pipe, tap } from 'core-domain/lib';
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
      andThen(it => {
        return pipe(
          {
            id: it.args.input.id,
            projectId: it.project.id,
            role: it.args.input.role,
            email: it.args.input.userEmail,
          },
          ProjectMemberInvitationMutations.build,
          andThen(context.db.projectMemberInvitation.create),
          andThen(invitation =>
            pipe(
              { invitation, projectId: invitation.projectId },
              ProjectMemberInvitationTokenMutations.build,
              andThen(context.db.projectMemberInvitationToken.create),
              map(token => ({
                ...it,
                invitation,
                token,
              }))
            )
          )
        );
      }),
      tap(it => {
        context.mailer.send({
          from: 'test@example.com',
          to: it.invitation.email,
          subject: `I've added you to "${it.project.name}" on Tracker`,
          body: `http://localhost:5000/projects/${it.project.id}/invitations/${it.token.id}}`,
        });
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
