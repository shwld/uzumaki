import {
  AccountMutations,
  Account_BuildInput,
  Account_BuiltAttributes,
  Account_ValidAttributes,
  User_Attributes,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { AccountRepository } from '../repositories/account';
import { getOrThrow } from './utils';

export const buildTestAccount = async (
  owner: User_Attributes,
  fields?: Partial<Account_BuildInput>
): Promise<Account_BuiltAttributes> => {
  const build = AccountMutations.build({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    ...fields,
    createdById: owner.id,
  });
  return getOrThrow(build);
};

export const createTestAccount = async (
  owner: User_Attributes,
  fields?: Partial<Account_BuildInput>
): Promise<Account_ValidAttributes> => {
  const account = await buildTestAccount(owner, fields);

  const create = AccountRepository.create(account);
  return getOrThrow(create);
};
