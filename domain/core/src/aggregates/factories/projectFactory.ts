import {
  AccountEntity,
  ProjectBoardConfigEntity,
  ProjectBoardStatusEntity,
  ProjectEntity,
  UpdatableProjectEntityFields,
  UserEntity,
} from '../../models';
import { generateId, generateTimeStampProperties } from '../../shared/entity';

const DEFAULT_INITIAL_VELOCITY = 10;
const DEFAULT_INITIAL_ITERATION_LENGTH = 2;

export const buildProject = (
  projectParams: UpdatableProjectEntityFields & {
    id: string;
    account: AccountEntity;
    createdBy: UserEntity;
    boardConfig?: {
      initialVelocity?: number;
      iterationLength?: number;
    };
  }
): ProjectEntity => {
  const { account, createdBy, boardConfig, ...params } = projectParams;
  const boardStatusId = generateId();
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
      initialVelocity: boardConfig?.initialVelocity ?? DEFAULT_INITIAL_VELOCITY,
      iterationLength:
        boardConfig?.iterationLength ?? DEFAULT_INITIAL_ITERATION_LENGTH,
      startIterationOn: 'MONDAY',
    }),
    boardStatusId,
    boardStatus: new ProjectBoardStatusEntity({
      ...generateTimeStampProperties(),
      id: boardStatusId,
      velocity: boardConfig?.initialVelocity ?? DEFAULT_INITIAL_VELOCITY,
    }),
  });
};
