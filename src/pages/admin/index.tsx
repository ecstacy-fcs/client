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

const AdminHome: NextPage = () => {
  const { approvalRequests, error, isLoading, mutate } = useApprovalRequests();
  const { isOpen, toggle } = useMobileMenuState();

  const onApprove = async (id: string) => {
    await fetcher(`sellers/${id}/approve`, 'PATCH',undefined)
    mutate();
    console.log("Approve", id);
  };

  const onDeny = async (id: string) => {
    await fetcher(`sellers/${id}/deny`, 'PATCH',undefined)
    mutate();
    console.log("Deny", id);
  };
  
  if(error){
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
                <SidebarLink icon={<IoCheckmarkCircle />}>Approval Requests</SidebarLink>
                <SidebarLink icon={<IoBag />}>Sellers</SidebarLink>
                <SidebarLink icon={<IoCash />}>Buyers</SidebarLink>
                <SidebarLink icon={<IoCart />}>Products</SidebarLink>
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
              <Flex
                direction="column"
                flex="1"
                overflow="auto"
                px="10"
                pt={{ md: 1, base: 1 }}
              >
                <Heading mb={5} color={mode("gray.700", "gray.400")}>
                  Approval Requests
                </Heading>
                <Box
                  flex="1"
                  borderWidth="3px"
                  borderStyle="dashed"
                  rounded="xl"
                  p='10'
                >
                  error
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  }
  if(isLoading){
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
                <SidebarLink icon={<IoCheckmarkCircle />}>Approval Requests</SidebarLink>
                <SidebarLink icon={<IoBag />}>Sellers</SidebarLink>
                <SidebarLink icon={<IoCash />}>Buyers</SidebarLink>
                <SidebarLink icon={<IoCart />}>Products</SidebarLink>
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
              <Flex
                direction="column"
                flex="1"
                overflow="auto"
                px="10"
                pt={{ md: 1, base: 1 }}
              >
                <Heading mb={5} color={mode("gray.700", "gray.400")}>
                  Approval Requests
                </Heading>
                <Box
                  flex="1"
                  borderWidth="3px"
                  borderStyle="dashed"
                  rounded="xl"
                  p='10'
                >
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    )
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
              <SidebarLink icon={<IoCheckmarkCircle />}>Approval Requests</SidebarLink>
              <SidebarLink icon={<IoBag />}>Sellers</SidebarLink>
              <SidebarLink icon={<IoCash />}>Buyers</SidebarLink>
              <SidebarLink icon={<IoCart />}>Products</SidebarLink>
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
            <Flex
              direction="column"
              flex="1"
              overflow="auto"
              px="10"
              pt={{ md: 1, base: 1 }}
            >
              <Heading mb={5} color={mode("gray.700", "gray.400")}>
                Approval Requests
              </Heading>
              <Box
                flex="1"
                borderWidth="3px"
                borderStyle="dashed"
                rounded="xl"
                p='10'
              >
                <ProductGrid >
                      {approvalRequests.map((approvalRequest) => (
                          <RequestCard key={approvalRequest.id} seller={approvalRequest} onApprove={onApprove} onDeny={onDeny} />
                      ))}
                  </ProductGrid>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminHome;
