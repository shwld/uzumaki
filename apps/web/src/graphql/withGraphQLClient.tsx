import { withUrqlClient } from 'next-urql';
import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core';
import { firebaseAuthExchange } from './authConfig';

export const withGraphQLClient = withUrqlClient(
  (_ssrExchange, ctx) => {
    return {
      url: '/api/graphql',
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },

      exchanges: [
        dedupExchange,
        cacheExchange,
        firebaseAuthExchange,
        fetchExchange,
      ],
    };
  },
  { ssr: false }
);
