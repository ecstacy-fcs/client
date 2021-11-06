import "../styles/globals.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Page from "~/components/Page";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex minH="100vh" direction="column">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}
export default MyApp;
