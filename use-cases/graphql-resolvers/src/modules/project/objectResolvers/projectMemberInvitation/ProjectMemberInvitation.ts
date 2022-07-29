import { ProjectMemberInvitationResolvers } from '../../../../generated/resolversTypes';

export const ProjectMemberInvitation: ProjectMemberInvitationResolvers = {
  async projectName(parent, _args, context, _info) {
    const project = await context.db.project.findBy({ id: parent.projectId });
    return project?.name ?? 'Not found';
  },
};
