import { db, handleError } from '../../lib/db';
import { Aggregates } from 'core-domain';
import { convertToValidAttributes } from './account-record';

export const findBy: Aggregates['account']['findBy'] = async args => {
  return db.account
    .findFirst({
      where: {
        id: args.id,
        accountMemberships: {
          some: {
            userId: args.user.id,
          },
        },
      },
    })
    .then(it => (it == null ? null : convertToValidAttributes(it)));
};
