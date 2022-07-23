import { ProjectUserResolvers } from '../../../../generated/resolversTypes';

export const ProjectUser: ProjectUserResolvers = {
  id(parent) {
    return `ProjectUser-${parent.userId}`;
  },
};
