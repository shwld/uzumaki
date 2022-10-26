import { db, handleError } from '../../lib/db';
import { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './account-record';

// export const membership: Aggregates['account']['membership'] =  async (account, user) => {
//     return db.accountMembership
//       .findUnique({
//         where: {
//           userId_accountId: {
//             userId: user.id,
//             accountId: account.id,
//           },
//         },
//       })
//       .then(mapToAccountMembershipEntityOrUndefined);
//   }
