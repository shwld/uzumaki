import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { initAuth } from '../config/auth';
import { withGraphQLClient } from '../graphql/withGraphQLClient';

initAuth();

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withGraphQLClient(App);
