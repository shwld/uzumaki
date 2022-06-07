import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { NextApiHandler } from 'next/types';
import type { GraphqlServerContext } from 'graphql-resolvers';
import { getEnveloped } from '../../graphql/envelop';

export default (async (req, res) => {
  const { parse, validate, execute, schema, contextFactory } = getEnveloped({
    req,
  });

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
      parse,
      validate,
      execute,
      // @ts-ignore FIXME
      contextFactory,
    });

    sendResult(result, res);
  }
}) as NextApiHandler;
