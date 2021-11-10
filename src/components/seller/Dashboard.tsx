import {
  Box,
  Flex,
  Spinner,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { default as Link, default as NextLink } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { IoAddCircle, IoCart, IoFileTrayFull, IoGrid } from "react-icons/io5";
import { MobileMenuButton } from "~/components/MobileMenuButton";
import Page from "~/components/Page";
import { ScrollArea } from "~/components/ScrollArea";
import { SidebarLink } from "~/components/SidebarLink";
import { UserInfo } from "~/components/UserInfo";
import { useMobileMenuState } from "~/hooks/useMobileMenuState";
import { useSeller } from "~/hooks/useSeller";
import { useUser } from "~/hooks/useUser";

const Home: NextPage<{ children: React.ReactChild }> = ({ children }) => {
  const router = useRouter();
  const { isOpen, toggle } = useMobileMenuState();
  const { user, isLoading } = useUser();
  const { seller } = useSeller();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [isLoading]);

  if (isLoading || !user) {
    return (
      <Page>
        <Flex alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Flex>
      </Page>
    );
  }

  return (
    <Flex
      height="100vh"
      bg={mode("purple.800", "gray.800")}
      overflow="hidden"
      sx={{ "--sidebar-width": "16rem" }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Link href="/profile">
            <Box
              as="a"
              href="#"
              p="3"
              display="block"
              transition="background 0.1s"
              rounded="xl"
              _hover={{ bg: "whiteAlpha.200" }}
              whiteSpace="nowrap"
            >
              <UserInfo name={user.name} email={user.email} />
            </Box>
          </Link>
          <ScrollArea pt="5" pb="6">
            <Stack pb="6">
              <NextLink href="/seller" passHref>
                <SidebarLink icon={<IoGrid />} disabled={!seller}>
                  Dashboard
                </SidebarLink>
              </NextLink>
              <NextLink href="/seller/products" passHref>
                <SidebarLink
                  icon={<IoFileTrayFull />}
                  disabled={!seller?.approved}
                >
                  My Products
                </SidebarLink>
              </NextLink>
              <NextLink href="/seller/products/new" passHref>
                <SidebarLink
                  icon={<IoAddCircle />}
                  disabled={!seller?.approved}
                >
                  Add a Product
                </SidebarLink>
              </NextLink>
              <NextLink href="/seller/orders" passHref>
                <SidebarLink icon={<IoCart />} disabled={!seller?.approved}>
                  My Orders
                </SidebarLink>
              </NextLink>
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        p={{ base: "0", md: "6" }}
        marginStart={{ md: "var(--sidebar-width)" }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg={mode("white", "gray.700")}
          height="100%"
          pb="6"
          rounded={{ md: "lg" }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
              </Flex>
            </Flex>
            <Flex
              direction="column"
              flex="1"
              overflow="auto"
              px="10"
              pt={{ md: 1, base: 8 }}
            >
              {children}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
