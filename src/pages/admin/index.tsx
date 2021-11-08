import type { NextPage } from "next";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import {
  BsFillBookmarksFill,
  BsFillInboxFill,
  BsPencilSquare,
  BsSearch,
} from "react-icons/bs";
import { MobileMenuButton } from "~/components/MobileMenuButton";
import { NavSectionTitle } from "~/components/NavSectionTitle";
import { ScrollArea } from "~/components/ScrollArea";
import { SidebarLink } from "~/components/SidebarLink";
import { UserInfo } from "~/components/UserInfo";
import { useMobileMenuState } from "~/hooks/useMobileMenuState";
import { IoCart, IoCash, IoBag, IoSettingsSharp, IoCheckmarkCircle } from "react-icons/io5";
import { RequestCard } from "~/components/RequestCard";
import { ProductGrid } from "~/components/ProductGrid";
import { useApprovalRequests } from "~/hooks/useApprovalRequests";
import { fetcher } from "~/lib/api";
import AdminApprovalRequestBox from "~/components/AdminApprovalRequestBox";
import { AdminDashboardTab } from "~/types/";
import AdminSellerDeleteBox from "~/components/AdminSellerDeleteBox";
import AdminBuyerDeleteBox from "~/components/AdminBuyerDeleteBox";
import AdminProductBox from "~/components/AdminProductBox";

const AdminHome: NextPage = () => {
  const [tab, setTab] = React.useState<AdminDashboardTab>('approval-requests');
  const { isOpen, toggle } = useMobileMenuState();
  

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
              <SidebarLink icon={<IoCheckmarkCircle />} onClick={() => setTab('approval-requests')}>Approval Requests</SidebarLink>
              <SidebarLink icon={<IoBag />} onClick={() => setTab('sellers')}>Sellers</SidebarLink>
              <SidebarLink icon={<IoCash />} onClick={() => setTab('buyers')}>Buyers</SidebarLink>
              <SidebarLink icon={<IoCart />} onClick={() => setTab('products')}>Products</SidebarLink>
            </Stack>
            <Stack pb="6">
              <NavSectionTitle>Profile</NavSectionTitle>
              <SidebarLink icon={<IoSettingsSharp />}>Settings</SidebarLink>
              <SidebarLink icon={<BsFillBookmarksFill />}>
                Bookmarks
              </SidebarLink>
              <SidebarLink icon={<BsPencilSquare />}>Drafts</SidebarLink>
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
            {tab === 'approval-requests' && <AdminApprovalRequestBox />}
            {tab === 'sellers' && <AdminSellerDeleteBox />}
            {tab === 'buyers' && <AdminBuyerDeleteBox />}
            {tab === 'products' && <AdminProductBox />}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminHome;
