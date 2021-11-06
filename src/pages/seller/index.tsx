import {
  Box,
  Flex,
  Spinner,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { BsSearch } from "react-icons/bs";
import {
  IoAddCircle,
  IoFileTrayFull,
  IoGrid,
  IoSettingsSharp,
} from "react-icons/io5";
import { MobileMenuButton } from "~/components/MobileMenuButton";
import { NavSectionTitle } from "~/components/NavSectionTitle";
import Page from "~/components/Page";
import { ScrollArea } from "~/components/ScrollArea";
import SellerDashboard from "~/components/seller/SellerDashboard";
import SellerProposalUpload from "~/components/seller/SellerProposalUpload";
import { SidebarLink } from "~/components/SidebarLink";
import { UserInfo } from "~/components/UserInfo";
import { useMobileMenuState } from "~/hooks/useMobileMenuState";
import { useSeller } from "~/hooks/useSeller";
import { useUser } from "~/hooks/useUser";

const Home: NextPage = () => {
  const router = useRouter();
  const { isOpen, toggle } = useMobileMenuState();
  const { user, isLoading, mutate } = useUser();
  const [uploaded, setUploaded] = React.useState();
  const {
    seller,
    isLoading: sellerIsLoading,
    mutate: sellerMutate,
  } = useSeller();

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
            <UserInfo name="Esther Collins" email="esther-colls@chakra.com" />
          </Box>
          <ScrollArea pt="5" pb="6">
            <SidebarLink
              display={{ base: "block", lg: "none" }}
              mb="2"
              icon={<BsSearch />}
            >
              Search
            </SidebarLink>
            <Stack pb="6">
              <NavSectionTitle>Actions</NavSectionTitle>
              <SidebarLink icon={<IoGrid />}>Dashboard</SidebarLink>
              <SidebarLink icon={<IoFileTrayFull />}>All Products</SidebarLink>
              <SidebarLink icon={<IoAddCircle />}>Add a Product</SidebarLink>
            </Stack>
            <Stack pb="6">
              <NavSectionTitle>Profile</NavSectionTitle>
              <SidebarLink icon={<IoSettingsSharp />}>Settings</SidebarLink>
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
              {seller ? (
                <SellerDashboard seller={seller} />
              ) : (
                <SellerProposalUpload mutate={sellerMutate} />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;