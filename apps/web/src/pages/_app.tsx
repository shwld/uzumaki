import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { withGraphQLClient } from '../graphql/withGraphQLClient';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default withGraphQLClient(App);
