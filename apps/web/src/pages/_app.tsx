import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { withClient } from '../graphql/urqlClient';
import { initAuth } from '../config/auth';

initAuth();

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withClient({ ssr: false })(App);
