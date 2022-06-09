import { isAuthenticated } from '../../shared/rules/isAuthenticated';

export const viewerPermission = {
  Viewer: isAuthenticated,
};
