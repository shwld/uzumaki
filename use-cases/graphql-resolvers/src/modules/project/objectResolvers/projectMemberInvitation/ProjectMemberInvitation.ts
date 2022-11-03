import { ProjectMemberInvitationResolvers } from '../../../../generated/resolvers-types';

export const ProjectMemberInvitation: ProjectMemberInvitationResolvers = {
  async projectName(parent, _args, context, _info) {
    const project = await context.db.project.findBy({ id: parent.projectId });
    return project?.name ?? 'Not found';
  },
};
