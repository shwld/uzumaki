import { ProjectPolicy } from 'core-domain';
import { andThen, getOrThrow, map, orElse, pipe } from 'core-domain';
import { ViewerResolvers } from '../../../../generated/resolvers-types';
import { toConnection } from '../../../../shared/helpers/connection-helpers';

export const Viewer: ViewerResolvers = {
  async accounts(_parent, args, context) {
    return toConnection(context.db.account, args, {
      user: context.currentUser!,
    });
  },
  async project(_parent, args, context, _info) {
    return getOrThrow(
      pipe(
        context.db.project.find({
          id: args.id,
        }),
        andThen(project =>
          pipe(
            ProjectPolicy(context.db).authorize({
              project,
              user: context.currentUser,
            }),
            map(it => it.project)
          )
        ),
        orElse(() => undefined)
      )
    );
  },
  invitationToken(_parent, args, context, _info) {
    return getOrThrow(
      pipe(
        context.db.projectMemberInvitationToken.findBy({
          id: args.confirmationToken,
        })
      )
    );
  },
};
