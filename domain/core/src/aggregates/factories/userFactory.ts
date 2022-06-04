import { UserEntity, UserEntityProperties } from '../../entities';
import { generateTimeStampProperties } from '../../entities/shared/entity';

export const buildUser = (
  userParams: UserEntityProperties & { id: string }
): UserEntity => {
  return new UserEntity({
    ...generateTimeStampProperties(),
    ...userParams,
  });
};
