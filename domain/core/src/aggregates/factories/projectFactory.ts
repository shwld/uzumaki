import {
  AccountEntity,
  ProjectBoardConfigEntity,
  ProjectEntity,
  UpdatableProjectEntityFields,
  UserEntity,
} from '../../models';
import { generateId, generateTimeStampProperties } from '../../shared/entity';

export const buildProject = (
  projectParams: UpdatableProjectEntityFields & {
    id: string;
    account: AccountEntity;
    createdBy: UserEntity;
  }
): ProjectEntity => {
  const { account, createdBy, ...params } = projectParams;
  const boardConfigId = generateId();
  return new ProjectEntity({
    ...generateTimeStampProperties(),
    ...params,
    accountId: account.id,
    createdById: createdBy.id,
    boardConfigId,
    boardConfig: new ProjectBoardConfigEntity({
      ...generateTimeStampProperties(),
      id: boardConfigId,
      initialVelocity: 10,
      iterationLength: 2,
      startIterationOn: 'MONDAY',
    }),
  });
};
