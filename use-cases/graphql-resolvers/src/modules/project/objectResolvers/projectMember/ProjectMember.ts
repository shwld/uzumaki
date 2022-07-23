import { ProjectMemberResolvers } from '../../../../generated/resolversTypes';

export const ProjectMember: ProjectMemberResolvers = {
  id(parent) {
    return `ProjectMember-${parent.userId}`;
  },
};
