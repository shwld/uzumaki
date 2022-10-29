import { AccountEntity, UserEntity, Account_Attributes, pipe, AccountMutations, Account_BuildInput, Account_BuiltAttributes, Result } from 'core-domain';
import { faker } from '@faker-js/faker';
import { AccountRepository } from '../repositories/account';

export const buildTestAccount = (
  owner: UserEntity,
  fields?: Partial<Account_BuildInput>
): Account_BuiltAttributes => {
  const built = AccountMutations.build({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    createdById: owner.id,
    ...fields,
  });
  if ()
};

export const createTestAccount = (
  owner: UserEntity,
  fields?: Partial<Account_BuildInput>
): Promise<AccountEntity> => {
  const account = pipe(buildTestAccount(owner, fields), AccountMutations.build);

  return AccountRepository.create({ __state: 'Built', ...account });
};
