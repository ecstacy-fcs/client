import '../styles/globals.css';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import type { AppProps } from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
// import theme from '~/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex minH="100vh" direction="column">
        <Header />
        <Flex flexGrow={1}>
          <Component {...pageProps} />
        </Flex>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}
export default MyApp;
