import { UserEntity, UpdatableUserEntityFields } from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildUser = (
  userParams: UpdatableUserEntityFields & { id: string }
): UserEntity => {
  return new UserEntity({
    ...generateTimeStampProperties(),
    ...userParams,
  });
};
