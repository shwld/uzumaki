import { withUrqlClient } from 'next-urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';
import { dedupExchange, fetchExchange } from '@urql/core';

const cache = cacheExchange({
  resolvers: {
    Viewer: {
      todos: relayPagination(),
    },
  },
});

export const withGraphQLClient = withUrqlClient(
  (_ssrExchange, _ctx) => {
    return {
      url: '/api/graphql',
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      exchanges: [dedupExchange, cache, fetchExchange],
    };
  },
  { ssr: false }
);
