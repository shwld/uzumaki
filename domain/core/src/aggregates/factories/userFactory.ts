import { UserEntity, UpdatableUserEntityFields } from '../../models';
import { generateTimeStampProperties } from '../../models/shared/entity';

export const buildUser = (
  userParams: UpdatableUserEntityFields & { id: string }
): UserEntity => {
  return new UserEntity({
    ...generateTimeStampProperties(),
    ...userParams,
  });
};
