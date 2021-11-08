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
import AddProduct from "~/components/seller/AddProduct";
import SellerDashboard from "~/components/seller/SellerDashboard";
import SellerProducts from "~/components/seller/SellerProducts";
import SellerProposalUpload from "~/components/seller/SellerProposalUpload";
import { SidebarLink } from "~/components/SidebarLink";
import { UserInfo } from "~/components/UserInfo";
import { useMobileMenuState } from "~/hooks/useMobileMenuState";
import { useSeller } from "~/hooks/useSeller";
import { useUser } from "~/hooks/useUser";
import type { SellerDashboardTab } from "../../types";
import Link from "next/link";

const Home: NextPage = () => {
  const [tab, setTab] = React.useState<SellerDashboardTab>("dashboard");
  const router = useRouter();
  const { isOpen, toggle } = useMobileMenuState();
  const { user, isLoading } = useUser();
  const { seller, mutate: sellerMutate } = useSeller();

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
            <SidebarLink
              display={{ base: "block", lg: "none" }}
              mb="2"
              icon={<BsSearch />}
            >
              Search
            </SidebarLink>
            <Stack pb="6">
              <NavSectionTitle>Actions</NavSectionTitle>
              <SidebarLink
                icon={<IoGrid />}
                onClick={() => setTab("dashboard")}
              >
                Dashboard
              </SidebarLink>
              <SidebarLink
                icon={<IoFileTrayFull />}
                onClick={() => setTab("all-products")}
              >
                All Products
              </SidebarLink>
              <SidebarLink
                icon={<IoAddCircle />}
                onClick={() => setTab("add-product")}
              >
                Add a Product
              </SidebarLink>
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
              {tab === "dashboard" ? (
                seller ? (
                  <SellerDashboard seller={seller} />
                ) : (
                  <SellerProposalUpload mutate={sellerMutate} />
                )
              ) : tab === "add-product" ? (
                <AddProduct />
              ) : (
                <SellerProducts />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
