import { GraphqlServerContext } from '../src';
import { db } from 'db';
import { MockedMailer } from './mocked-mailer';
import { MockedPubsub } from './mocked-pubsub';
import { mockedBackground } from './mocked-background';
import { createTestUser } from 'db/src/test-data';
import { RequiredObject, requireObjectArgumentOrThrow } from 'core-domain';

export type AuthorizedContext = RequiredObject<GraphqlServerContext>;
export async function createUserAuthorizedContext(): Promise<AuthorizedContext> {
  const user = await createTestUser();
  const context = {
    env: {
      origin: 'http://localhost:5000',
    },
    currentUser: user,
    db,
    mailer: MockedMailer,
    pubsub: MockedPubsub,
    background: mockedBackground,
  };

  return requireObjectArgumentOrThrow(context);
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
