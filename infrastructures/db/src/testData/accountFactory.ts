import {
  buildAccount,
  AccountEntity,
  AccountEntityFields,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { accountRepository } from '../repositories/accountRepository';

export const buildTestAccountAttributes = (
  fields?: Partial<AccountEntityFields>
): AccountEntityFields => {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    name: faker.name.findName(),
    ...fields,
  };
};

export const buildTestAccount = (
  fields?: Partial<AccountEntityFields>
): AccountEntity => {
  return buildAccount({
    ...buildTestAccountAttributes(fields),
  });
};

export const createTestAccount = (
  owner: UserEntity,
  fields?: Partial<AccountEntityFields>
): Promise<AccountEntity> => {
  const account = buildAccount({
    ...buildTestAccountAttributes(fields),
  });

  return accountRepository.create(account, owner);
};
