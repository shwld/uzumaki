/* eslint-disable react-hooks/rules-of-hooks */
import { envelop, useLogger, useSchema, useTiming } from '@envelop/core';
import { useGraphQLMiddleware } from '@envelop/graphql-middleware';
import { permissions, schema } from 'graphql-resolvers';
import { useOrderedServerContextPlugins } from './context';

export const getEnveloped = envelop({
  plugins: [
    useSchema(schema),
    ...useOrderedServerContextPlugins(),
    useLogger(),
    useTiming(),
    useGraphQLMiddleware([permissions]),
  ],
});
