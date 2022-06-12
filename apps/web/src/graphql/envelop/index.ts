/* eslint-disable react-hooks/rules-of-hooks */
import { envelop, useLogger, useSchema, useTiming } from '@envelop/core';
import { schema } from 'graphql-resolvers';
import { useOrderedServerContextPlugins } from './context';

export const getEnveloped = envelop({
  plugins: [
    ...useOrderedServerContextPlugins(),
    useSchema(schema),
    useLogger(),
    useTiming(),
  ],
});
