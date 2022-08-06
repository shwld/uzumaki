import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  sendPushResult,
  shouldRenderGraphiQL,
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

  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({
        endpoint: '/api/graphql',
      })
    );
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

    // res.writeHead(200, {
    //   Connection: 'keep-alive',
    //   'Content-Encoding': 'none',
    //   'Cache-Control': 'no-cache',
    //   'Content-Type': 'text/event-stream',
    // });
    // console.log('----------------', result);
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Content-Encoding', 'none');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('X-Accel-Buffering', 'no');

    // res.write('data: Processing...');

    // for (let i = 0; i < 5; i++) {
    //   res.write(`data: Hello seq ${i}\n\n`);
    //   console.log('----------------', i);
    //   await new Promise(resolve => setTimeout(resolve, 2000));
    // }

    // res.end('done\n');
    sendResult(result, res);
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
