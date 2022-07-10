import { Account, AccountMembership } from '@prisma/client';
import { AccountEntity, AccountMembershipEntity } from 'core-domain';
import type { UpdatableAccountEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToAccountEntity = (item: Account) =>
  new AccountEntity({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    isDeleted: false,
    name: item.name,
  });
const mapToAccountMembershipEntity = (item: AccountMembership) =>
  new AccountMembershipEntity({
    userId: item.userId,
    accountId: item.accountId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    role: item.role,
  });
const mapToAccountEntityOrUndefined = (item: Account | null | undefined) =>
  item != null ? mapToAccountEntity(item) : undefined;
const mapToAccountMembershipEntityOrUndefined = (
  item: AccountMembership | null | undefined
) => (item != null ? mapToAccountMembershipEntity(item) : undefined);

const mapFromEntity = (item: AccountEntity): UpdatableAccountEntityFields => ({
  name: item.name,
});

/**
 * Repositories
 */
export const accountRepository: Aggregates['account'] = {
  async save(item) {
    const account = await db.account.findUnique({ where: { id: item.id } });
    if (account == null) {
      if (item.createdBy == null) {
        throw new Error('created user (createdBy) is required');
      }
      return db.account
        .create({
          data: {
            ...mapFromEntity(item),
            id: item.id,
            accountMemberships: {
              create: {
                role: 'OWNER',
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                user: {
                  connect: {
                    id: item.createdBy.id,
                  },
                },
              },
            },
          },
        })
        .then(mapToAccountEntity);
    } else if (item.isDeleted) {
      return db.account
        .delete({ where: { id: item.id } })
        .then(mapToAccountEntity);
    } else {
      return db.account
        .update({
          data: mapFromEntity(item),
          where: { id: item.id },
        })
        .then(mapToAccountEntity);
    }
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
      .then((todos) => ({
        nodes: todos.map(mapToAccountEntity),
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
      .then(mapToAccountEntityOrUndefined);
  },

  async membership(account, user) {
    return db.accountMembership
      .findUnique({
        where: {
          userId_accountId: {
            userId: user.id,
            accountId: account.id,
          },
        },
      })
      .then(mapToAccountMembershipEntityOrUndefined);
  },
  async memberships(account) {
    const totalCount = await db.accountMembership.aggregate({
      where: {
        accountId: account.id,
      },
      _count: true,
    });
    return db.account
      .findUnique({ where: { id: account.id } })
      .accountMemberships()
      .then((accountMemberships) => ({
        nodes: accountMemberships.map(mapToAccountMembershipEntity),
        totalCount: totalCount._count,
      }));
  },
};
