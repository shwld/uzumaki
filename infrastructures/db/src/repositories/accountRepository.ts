import { Account } from '@prisma/client';
import { AccountEntity } from 'core-domain';
import type { UpdatableAccountEntityFields, Aggregates } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToAccountEntity = (item: Account) =>
  new AccountEntity({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  });
const mapToEntityOrUndefined = (item: Account | null | undefined) =>
  item != null ? mapToAccountEntity(item) : undefined;

const mapFromEntity = (item: AccountEntity): UpdatableAccountEntityFields => ({
  name: item.name,
});

/**
 * Repositories
 */
export const accountRepository: Aggregates['account'] = {
  create(data) {
    return db.account
      .create({
        data: {
          id: data.id,
          ...mapFromEntity(data),
        },
      })
      .then(mapToAccountEntity);
  },
  update(item) {
    return db.account
      .update({
        data: mapFromEntity(item),
        where: { id: item.id },
      })
      .then(mapToAccountEntity);
  },
  destroy(item) {
    return db.account
      .delete({ where: { id: item.id } })
      .then(mapToAccountEntity);
  },
  async findMany({ ...args }) {
    const options = {
      where: {},
    };
    const totalCount = await db.account.aggregate({
      ...options,
      _count: true,
    });
    return db.account.findMany({ ...options, ...args }).then((todos) => ({
      nodes: todos.map(mapToAccountEntity),
      totalCount: totalCount._count,
    }));
  },
  findBy(args) {
    return db.account
      .findFirst({
        where: { id: args.id },
      })
      .then(mapToEntityOrUndefined);
  },
};
