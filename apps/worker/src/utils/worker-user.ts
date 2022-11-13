import { UserEntity } from 'core-domain';

export const buildWorker = (): UserEntity => {
  return UserEntity({
    id: 'A0A88591-CE4D-421D-8C84-0C6E050178CB',
    uid: 'worker|user0001',
    email: 'iam@shwld.net',
    name: 'worker',
    avatarImageUrl: 'https://example.com/avatar.png',
    createdAt: new Date(2022, 1, 1),
    updatedAt: new Date(2022, 1, 1),
  });
};
