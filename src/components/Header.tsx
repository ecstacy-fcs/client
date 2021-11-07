import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { useUser } from "~/hooks/useUser";
import Logo from "./Logo";

interface Props {}

const Header = (props: Props) => {
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const { user, isLoading } = useUser();
  const { logout } = useAuth();

  const onLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  };

  return (
    <Box borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.lg" py="5">
        <Flex alignItems="center" justifyContent="space-between">
          <Logo />
          <InputGroup maxW="lg" marginX="3">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input variant="filled" type="search" />
          </InputGroup>
          <HStack
            spacing="3"
            alignItems="center"
            justifyContent="space-between"
          >
            <NextLink href="/" passHref>
              <Link fontSize="md" color="gray.700" fontWeight="medium">
                Shop
              </Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link fontSize="md" color="gray.700" fontWeight="medium">
                Sell
              </Link>
            </NextLink>
            {user ? (
              <>
                <Button
                  colorScheme="purple"
                  size="sm"
                  onClick={onLogout}
                  isLoading={isLoading || loggingOut}
                >
                  Log Out
                </Button>
                <NextLink href="/profile" passHref>
                  <Avatar size="sm" name={user.name} cursor="pointer" />
                </NextLink>
              </>
            ) : (
              <NextLink href="/auth/login" passHref>
                <Button colorScheme="purple" size="sm" isLoading={isLoading}>
                  Log In
                </Button>
              </NextLink>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
