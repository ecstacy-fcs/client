import '../styles/globals.css';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ChakraProvider>
  );
}
export default MyApp;
