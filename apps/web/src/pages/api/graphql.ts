import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { NextApiHandler } from 'next/types';
import { prepareUser, schema } from 'graphql-resolvers';
import type { GraphqlServerContext } from 'graphql-resolvers';
import { getToken } from 'next-auth/jwt';
import { db } from 'db';

export default (async (req, res) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const user =
    token?.sub != null
      ? {
          id: token.sub,
          email: token.email ?? '',
          name: token.name ?? 'No name',
          picture: token.picture ?? '',
        }
      : undefined;

  const context: GraphqlServerContext = {
    user: user != null ? await prepareUser(db, user) : undefined,
    db,
  };

  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method ?? 'GET',
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(renderGraphiQL({ endpoint: '/api/graphql' }));
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest<GraphqlServerContext>({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => context,
    });

    sendResult(result, res);
  }
}) as NextApiHandler;
