import { allow, shield } from 'graphql-shield';
import { isAuthenticated } from './rules/is-authenticated';

const permission = {
  ProjectBoardStatus: isAuthenticated,
  ProjectBoardConfig: isAuthenticated,
  ProjectMemberInvitationToken: isAuthenticated,
  Anonymous: isAuthenticated,
  ProjectMemberInvitation: isAuthenticated,
  ProjectMember: isAuthenticated,
  Viewer: isAuthenticated,
  Account: isAuthenticated,
  Project: isAuthenticated,
  Story: isAuthenticated,
  User: allow,
  Query: {
    anonymous: isAuthenticated,
    viewer: isAuthenticated,
  },
  Mutation: {
    joinProjectMember: isAuthenticated,
    inviteProjectMember: isAuthenticated,
    updateStoryState: isAuthenticated,
    estimateStory: isAuthenticated,
    moveStories: isAuthenticated,
    createAccount: isAuthenticated,
    updateAccount: isAuthenticated,
    createProject: isAuthenticated,
    createStory: isAuthenticated,
    updateStory: isAuthenticated,
    destroyStory: isAuthenticated,
  },
};

export const permissionMiddleware = shield(permission, {
  fallbackRule: allow,
});
