import { AccountEntity, UpdatableAccountEntityFields } from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildAccount = (
  accountParams: UpdatableAccountEntityFields & { id: string }
): AccountEntity => {
  return new AccountEntity({
    ...generateTimeStampProperties(),
    ...accountParams,
  });
};
