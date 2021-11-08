import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import VerifyEmail from "~/components/VerifyEmail";
import { useUser } from "~/hooks/useUser";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, isLoading } = useUser();
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>Ecstacy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider>
        <Flex minH="100vh" direction="column">
          <Header />
          {!pathname.startsWith("/auth/") &&
          !isLoading &&
          user &&
          !user.verified ? (
            <VerifyEmail user={user} />
          ) : (
            <Component {...pageProps} />
          )}
          <Footer />
        </Flex>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
