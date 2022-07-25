import { useExtendContext } from '@envelop/core';
import { db } from 'db';
import { createMailer } from 'mailer';
import { GraphqlServerContext, prepareUser, useAuth } from 'graphql-resolvers';
import { NextApiRequest } from 'next';
import { getToken, JWT } from 'next-auth/jwt';

async function prepareCurrentUser(token: JWT | null) {
  const user =
    token?.sub != null
      ? {
          uid: token.sub,
          email: token.email ?? '',
          name: token.name ?? 'No name',
          avatarImageUrl: token.picture ?? '',
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
    mailer: createMailer(
      process.env.MAILGUN_API_KEY!,
      process.env.MAILGUN_DOMAIN!
    ),
  };
}

export const useOrderedServerContextPlugins = () => [
  useExtendContext(createContext),
  useAuth(),
];
