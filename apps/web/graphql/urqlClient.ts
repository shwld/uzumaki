import { withUrqlClient, WithUrqlClientOptions } from 'next-urql';
import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core';

export const withClient = (options: WithUrqlClientOptions = { ssr: true }) =>
  withUrqlClient(
    () => ({
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? '/api/graphql',
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      exchanges: [dedupExchange, cacheExchange, fetchExchange],
    }),
    options
  );
