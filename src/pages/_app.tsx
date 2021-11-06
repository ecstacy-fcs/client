import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import VerifyEmail from "~/components/VerifyEmail";
import { useUser } from "~/hooks/useUser";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, isLoading } = useUser();
  const { pathname } = useRouter();
  return (
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
  );
}
export default MyApp;
