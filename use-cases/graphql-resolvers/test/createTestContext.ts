import { GraphqlServerContext } from '../src';
import { db } from 'db';
import { MockedMailer } from './mockedMailer';
import { MockedPubsub } from './mockedPubsub';
import { mockedBackground } from './mockedBackground';
import { createTestUser } from 'db/src/test-data';

export async function createUserAuthorizedContext(): Promise<
  Required<GraphqlServerContext>
> {
  const user = await createTestUser();
  return {
    env: {
      origin: 'http://localhost:5000',
    },
    currentUser: user,
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
    currentUser: null,
    db,
    mailer: MockedMailer,
    pubsub: MockedPubsub,
    background: mockedBackground,
  };
}
