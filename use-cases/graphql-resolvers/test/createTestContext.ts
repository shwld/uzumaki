import { buildUser } from 'core-domain';
import { GraphqlServerContext } from '../src';
import { db } from 'db';
import { generateUuid } from './generateUuid';

export async function createUserAuthorizedContext(): Promise<
  Required<GraphqlServerContext>
> {
  const user = buildUser({
    id: generateUuid(),
    name: 'test',
    email: 'test@example.com',
    picture: 'https://example.com/picture.png',
  });
  const currentUser = await db.user.create(user);
  return {
    currentUser,
    db,
  };
}

export async function createUserUnauthorizedContext(): Promise<GraphqlServerContext> {
  return {
    currentUser: undefined,
    db,
  };
}
