import {
  getGraphQLParameters,
  processRequest,
  sendResult,
} from 'graphql-helix';
import { NextApiHandler } from 'next/types';
import type { GraphqlServerContext } from 'graphql-resolvers';
import { getEnveloped } from '../../../graphql/envelop';

const handler: NextApiHandler = async (req, res) => {
  const { parse, validate, execute, schema, contextFactory } = getEnveloped({
    req,
  });

  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method ?? 'GET',
    query: req.query,
  };

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

  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('X-Accel-Buffering', 'no');

  sendResult(result, res);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
