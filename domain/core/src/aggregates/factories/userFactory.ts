import { UserEntity, UpdatableUserEntityFields } from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildUser = (
  userParams: UpdatableUserEntityFields & { id: string; uid: string }
): UserEntity => {
  return new UserEntity({
    ...generateTimeStampProperties(),
    ...userParams,
  });
};

export const buildWorker = (
  userParams: UpdatableUserEntityFields & { id: string; uid: string }
): UserEntity => {
  return new UserEntity({
    ...generateTimeStampProperties(),
    ...userParams,
  });
};
