import {
  buildAccount,
  AccountEntity,
  AccountEntityFields,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { accountRepository } from '../repositories/account/account-create';

export const buildTestAccountAttributes = (
  fields?: Partial<AccountEntityFields>
): AccountEntityFields => {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: faker.name.findName(),
    createdById: faker.datatype.uuid(),
    isDeleted: false,
    isUpdated: false,
    ...fields,
  };
};

export const buildTestAccount = (
  owner: UserEntity,
  fields?: Partial<AccountEntityFields>
): AccountEntity => {
  return buildAccount(
    {
      ...buildTestAccountAttributes(fields),
    },
    owner
  );
};

export const createTestAccount = (
  owner: UserEntity,
  fields?: Partial<AccountEntityFields>
): Promise<AccountEntity> => {
  const account = buildAccount(
    {
      ...buildTestAccountAttributes(fields),
    },
    owner
  );

  return accountRepository.save(account);
};
