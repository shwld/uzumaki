/* eslint-disable react-hooks/rules-of-hooks */

import { createFetch } from '@whatwg-node/fetch';
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
  fetchAPI: createFetch({
    // We prefer `node-fetch` over `undici` and current unstable Node's implementation
    useNodeFetch: true,
    formDataLimits: {
      // Maximum allowed file size (in bytes)
      fileSize: 1024000,
      // Maximum allowed number of files
      files: 1,
      // Maximum allowed size of content (operations, variables etc...)
      fieldSize: 1024000,
      // Maximum allowed header size for form data
      headerSize: 1024000,
    },
  }),
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
