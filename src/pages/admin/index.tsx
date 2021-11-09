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
import { BsFillBookmarksFill, BsPencilSquare, BsSearch } from "react-icons/bs";
import {
  IoBag,
  IoCart,
  IoCash,
  IoCheckmarkCircle,
  IoSettingsSharp,
} from "react-icons/io5";
import AdminApprovalRequestBox from "~/components/admin/AdminApprovalRequestBox";
import AdminBuyerDeleteBox from "~/components/admin/AdminBuyerDeleteBox";
import AdminProductBox from "~/components/admin/AdminProductBox";
import AdminSellerDeleteBox from "~/components/admin/AdminSellerDeleteBox";
import { MobileMenuButton } from "~/components/MobileMenuButton";
import { NavSectionTitle } from "~/components/NavSectionTitle";
import Page from "~/components/Page";
import { ScrollArea } from "~/components/ScrollArea";
import { SidebarLink } from "~/components/SidebarLink";
import { UserInfo } from "~/components/UserInfo";
import { useMobileMenuState } from "~/hooks/useMobileMenuState";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";
import { AdminDashboardTab } from "~/types";

const AdminHome: NextPage = () => {
  const [tab, setTab] = React.useState<AdminDashboardTab>("approval-requests");
  const { isOpen, toggle } = useMobileMenuState();
  const router = useRouter();
  const { user, isLoading } = useUser();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [isLoading]);

  React.useEffect(() => {
    fetcher(`users/${user?.id}`, "GET", {}).then((res) => {
      if (res.data && !res.data.adminProfile) {
        router.push("/");
      }
    });
  }, [user, isLoading]);

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
            <UserInfo name={user.name} email={user.email} />
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
              <SidebarLink
                icon={<IoCheckmarkCircle />}
                onClick={() => setTab("approval-requests")}
              >
                Approval Requests
              </SidebarLink>
              <SidebarLink icon={<IoBag />} onClick={() => setTab("sellers")}>
                Sellers
              </SidebarLink>
              <SidebarLink icon={<IoCash />} onClick={() => setTab("buyers")}>
                Buyers
              </SidebarLink>
              <SidebarLink icon={<IoCart />} onClick={() => setTab("products")}>
                Products
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
            {tab === "approval-requests" && <AdminApprovalRequestBox />}
            {tab === "sellers" && <AdminSellerDeleteBox />}
            {tab === "buyers" && <AdminBuyerDeleteBox />}
            {tab === "products" && <AdminProductBox />}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminHome;
