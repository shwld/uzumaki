import {
  AccountEntity,
  UserEntity,
  Account_BuildInput,
  Account_BuiltAttributes,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { AccountRepository } from '../repositories/account';
import { RepositoryRuntimeError, Result } from 'core-domain/src/shared';

export const buildTestAccount = (
  owner: UserEntity,
  fields?: Partial<Account_BuildInput>
): Account_BuiltAttributes => {
  return {
    __state: 'Built',
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...fields,
    createdById: owner.id,
  };
};

export const createTestAccount = (
  owner: UserEntity,
  fields?: Partial<Account_BuildInput>
): Result<RepositoryRuntimeError, AccountEntity> => {
  const account = buildTestAccount(owner, fields);

  return AccountRepository.create(account);
};
