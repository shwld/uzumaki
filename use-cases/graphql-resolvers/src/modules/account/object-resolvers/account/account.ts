import { AccountResolvers } from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connection-helpers';

export const Account: AccountResolvers = {
  projects(parent, args, context, info) {
    return toConnection(context.db.project, args, { account: parent });
  },
};
