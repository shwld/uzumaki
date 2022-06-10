import { buildUser } from 'core-domain';
import { GraphqlServerContext } from '../src';
import { db } from 'db';
import { generateUuid } from './generateUuid';

export function createUserAuthorizedContext(): Required<GraphqlServerContext> {
  const currentUser = buildUser({
    id: generateUuid(),
    name: 'test',
    email: 'test@example.com',
    picture: 'https://example.com/picture.png',
  });
  return {
    currentUser,
    db,
  };
}

export function createUserUnauthorizedContext(): GraphqlServerContext {
  return {
    currentUser: undefined,
    db,
  };
}
