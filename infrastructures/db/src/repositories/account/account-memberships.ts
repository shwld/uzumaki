import { db, handleError } from '../../lib/db';
import { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './account-record';

// export const membership: Aggregates['account']['membership'] =  async (account)=> {
//   const totalCount = await db.accountMembership.aggregate({
//     where: {
//       accountId: account.id,
//     },
//     _count: true,
//   });
//   return db.account
//     .findUnique({ where: { id: account.id } })
//     .accountMemberships()
//     .then(accountMemberships => ({
//       nodes: accountMemberships.map(mapToAccountMembershipEntity),
//       totalCount: totalCount._count,
//     }));
// },
