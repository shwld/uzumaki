import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { NextApiHandler } from 'next/types';
import { schema } from 'graphql-resolvers';
import type { GraphqlServerContext } from 'graphql-resolvers';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export default (async (req, res) => {
  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // TODO: subを使って、ユーザーを作成
  console.log({ token, session });
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
      contextFactory: () => ({
        currentUserId: token?.sub,
      }),
    });

    sendResult(result, res);
  }
}) as NextApiHandler;
