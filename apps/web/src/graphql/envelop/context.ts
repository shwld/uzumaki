import { useExtendContext } from '@envelop/core';
import { Md5 } from 'ts-md5/dist/md5';
import { db } from 'db';
import { createMailer } from 'mailer';
import { GraphqlServerContext, prepareUser, useAuth } from 'graphql-resolvers';
import { NextApiRequest } from 'next';
import { getToken, JWT } from 'next-auth/jwt';

function makeGravatarUrl(email: string | undefined | null): string {
  if (email == null)
    // default
    return 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y';

  const hash = Md5.hashStr(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}.jpg`;
}

async function prepareCurrentUser(token: JWT | null) {
  const user =
    token?.sub != null
      ? {
          uid: token.sub,
          email: token.email ?? '',
          name: token.name ?? 'No name',
          avatarImageUrl: token.picture ?? makeGravatarUrl(token.email),
        }
      : undefined;

  return user != null ? await prepareUser(db, user) : undefined;
}

async function createContext({
  req,
}: {
  req: NextApiRequest;
}): Promise<GraphqlServerContext> {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const currentUser = await prepareCurrentUser(token);

  return {
    currentUser,
    db,
    mailer: createMailer(),
  };
}

export const useOrderedServerContextPlugins = () => [
  useExtendContext(createContext),
  useAuth(),
];
