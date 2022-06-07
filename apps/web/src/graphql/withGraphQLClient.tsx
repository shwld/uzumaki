import { withUrqlClient } from 'next-urql';
import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core';

export const withGraphQLClient = withUrqlClient(
  (_ssrExchange, _ctx) => {
    return {
      url: '/api/graphql',
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },

      exchanges: [dedupExchange, cacheExchange, fetchExchange],
    };
  },
  { ssr: false }
);
