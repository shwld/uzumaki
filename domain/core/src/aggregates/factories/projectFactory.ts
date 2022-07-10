import {
  AccountEntity,
  ProjectEntity,
  UpdatableProjectEntityFields,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildProject = (
  projectParams: UpdatableProjectEntityFields & {
    id: string;
    account: AccountEntity;
  }
): ProjectEntity => {
  const { account, ...params } = projectParams;
  return new ProjectEntity({
    ...generateTimeStampProperties(),
    ...params,
    accountId: account.id,
    isDeleted: false,
  });
};
