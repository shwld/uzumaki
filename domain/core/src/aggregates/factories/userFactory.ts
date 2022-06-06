import { UserEntity, UserEntityProperties } from '../../models';
import { generateTimeStampProperties } from '../../models/shared/entity';

export const buildUser = (
  userParams: UserEntityProperties & { id: string }
): UserEntity => {
  return new UserEntity({
    ...generateTimeStampProperties(),
    ...userParams,
  });
};
