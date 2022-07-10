import {
  AccountEntity,
  UpdatableAccountEntityFields,
  UserEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildAccount = (
  accountParams: UpdatableAccountEntityFields & { id: string },
  createdBy: UserEntity
): AccountEntity => {
  return new AccountEntity({
    ...generateTimeStampProperties(),
    ...accountParams,
    isDeleted: false,
  }).setCreatedBy(createdBy);
};
