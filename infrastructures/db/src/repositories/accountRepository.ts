import {
  AccountRecord,
  AccountEntity,
  RepositoryRuntimeError,
  Account_Attributes,
  Result,
  pipe,
  tryCatch,
  andThen,
} from 'core-domain';
import type { Aggregates } from 'core-domain';
import { db, handleError } from '../lib/db';

/**
 * Repositories
 */
export const accountRepository: Aggregates['account'] = {
  create(attributes) {
    return pipe(attributes, AccountRecord.fieldsFromBuildInput, record => {
      return tryCatch(
        () =>
          db.account
            .create({
              data: {
                ...record,
                createdBy: {
                  connect: {
                    id: attributes.createdById,
                  },
                },
                accountMemberships: {
                  create: {
                    role: 'OWNER',
                    user: {
                      connect: {
                        id: attributes.createdById,
                      },
                    },
                  },
                },
              },
            })
            .then(AccountEntity.fromRecord),
        handleError
      );
    });
  },
  async update(attributes) {
    return db.account
      .update({
        data: AccountRecord.fieldsFromEditInput(attributes),
        where: { id: attributes.id },
      })
      .then(AccountEntity.fromRecord);
  },
  async delete(attributes) {
    return db.account
      .delete({ where: { id: attributes.id } })
      .then(AccountEntity.fromRecord);
  },
  async findMany({ user, ...args }) {
    const options = {
      where: {
        accountMemberships: {
          some: {
            userId: user.id,
          },
        },
      },
    };
    const totalCount = await db.account.aggregate({
      ...options,
      _count: true,
    });
    return db.account
      .findMany({
        ...options,
        ...args,
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then(items => ({
        nodes: items.map(AccountEntity.fromRecord),
        totalCount: totalCount._count,
      }));
  },
  findBy(args) {
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
      .then(it => (it == null ? null : AccountEntity.fromRecord(it)));
  },
  // async membership(account, user) {
  //   return db.accountMembership
  //     .findUnique({
  //       where: {
  //         userId_accountId: {
  //           userId: user.id,
  //           accountId: account.id,
  //         },
  //       },
  //     })
  //     .then(mapToAccountMembershipEntityOrUndefined);
  // },
  // async memberships(account) {
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
};
