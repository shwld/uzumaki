import { allow, shield } from 'graphql-shield';
import { isAuthenticated } from './rules/isAuthenticated';

const permission = {
  ProjectUser: isAuthenticated,
  Viewer: isAuthenticated,
  Account: isAuthenticated,
  Project: isAuthenticated,
  Story: isAuthenticated,
  User: allow,
  Query: {
    viewer: isAuthenticated,
  },
  Mutation: {
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
