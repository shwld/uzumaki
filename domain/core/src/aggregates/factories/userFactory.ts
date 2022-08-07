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

export const buildWorker = (): UserEntity => {
  return new UserEntity({
    ...generateTimeStampProperties(),
    id: 'A0A88591-CE4D-421D-8C84-0C6E050178CB',
    uid: 'worker|user0001',
    email: 'iam@shwld.net',
    name: 'worker',
    avatarImageUrl: 'https://example.com/avatar.png',
  });
};
