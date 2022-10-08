import { buildUser } from 'core-domain';
import { GraphqlServerContext } from '../src';
import { db } from 'db';
import { generateUuid } from './generateUuid';
import { faker } from '@faker-js/faker';
import { MockedMailer } from './mockedMailer';
import { MockedPubsub } from './mockedPubsub';
import { mockedBackground } from './mockedBackground';

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
    env: {
      origin: 'http://localhost:5000',
    },
    currentUser,
    db,
    mailer: MockedMailer,
    pubsub: MockedPubsub,
    background: mockedBackground,
  };
}

export async function createUserUnauthorizedContext(): Promise<GraphqlServerContext> {
  return {
    env: {
      origin: 'http://localhost:5000',
    },
    currentUser: undefined,
    db,
    mailer: MockedMailer,
    pubsub: MockedPubsub,
    background: mockedBackground,
  };
}
