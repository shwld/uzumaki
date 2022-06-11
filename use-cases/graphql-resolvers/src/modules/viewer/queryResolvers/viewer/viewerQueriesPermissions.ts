import { isAuthenticated } from '../../../../shared/rules/isAuthenticated';

export const viewerQueryPermissions = {
  viewer: isAuthenticated,
};
