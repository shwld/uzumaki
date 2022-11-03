import { ProjectMemberResolvers } from '../../../../generated/resolvers-types';

export const ProjectMember: ProjectMemberResolvers = {
  isMe(parent, _args, context, _info) {
    return context.currentUser?.id === parent.userId;
  },
};
