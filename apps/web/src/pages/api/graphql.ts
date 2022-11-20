/* eslint-disable react-hooks/rules-of-hooks */

import { useLogger, useSchema, useTiming } from '@envelop/core';
import { useOrderedServerContextPlugins } from '../../graphql/context';
import { createYoga } from 'graphql-yoga';
import { schema } from 'graphql-resolvers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default createYoga<{
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

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
