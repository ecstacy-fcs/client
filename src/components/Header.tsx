import { Box, Button, Container, Flex, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import Logo from './Logo';

interface Props {}

const Header = (props: Props) => {
  return (
    <Box borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.lg" py="5">
        <Flex alignItems="center" justifyContent="space-between">
          <Logo />
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
            <NextLink href="/auth/login" passHref>
              <Button colorScheme="purple" size="sm">
                {' '}
                Log In
              </Button>
            </NextLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
