import { buildUser } from 'core-domain';
import { GraphqlServerContext } from '../src';
import { db } from 'db';
import { generateUuid } from './generateUuid';
import { faker } from '@faker-js/faker';
import { MockedMailer } from './mockedMailer';

export async function createUserAuthorizedContext(): Promise<
  Required<GraphqlServerContext>
> {
  const user = buildUser({
    id: generateUuid(),
    uid: generateUuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatarImageUrl: faker.internet.url(),
  });
  const currentUser = await db.user.save(user);
  return {
    currentUser,
    db,
    mailer: MockedMailer,
  };
}

export async function createUserUnauthorizedContext(): Promise<GraphqlServerContext> {
  return {
    currentUser: undefined,
    db,
    mailer: MockedMailer,
  };
}
