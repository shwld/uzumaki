import { withUrqlClient, WithUrqlClientOptions } from 'next-urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';
import { dedupExchange, fetchExchange } from '@urql/core';
import { NextPage } from 'next';
import App from 'next/app';

const cache = cacheExchange({
  resolvers: {
    Viewer: {
      todos: relayPagination(),
    },
  },
});

export const withGraphQLClient = <C extends NextPage<any, any> | typeof App>(
  c: C,
  options: WithUrqlClientOptions = { ssr: false }
) =>
  withUrqlClient((_ssrExchange, _ctx) => {
    return {
      url: '/api/graphql',
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      exchanges: [dedupExchange, cache, fetchExchange],
    };
  }, options)(c);
