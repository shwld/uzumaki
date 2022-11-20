/* eslint-disable react-hooks/rules-of-hooks */

import { useLogger, useSchema, useTiming } from '@envelop/core';
import { useOrderedServerContextPlugins } from '../../../graphql/context';
import { createYoga } from 'graphql-yoga';
import { schema } from 'graphql-resolvers';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const yoga = createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  plugins: [
    ...useOrderedServerContextPlugins(),
    useSchema(schema),
    useLogger(),
    useTiming(),
  ],
});

const handler: NextApiHandler = async (req, res) => {
  await yoga(req, res);

  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('X-Accel-Buffering', 'no');
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
