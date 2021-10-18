import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {}

const Header = (props: Props) => {
  return (
    <Box borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.lg" py="5">
        <Flex alignItems="center" justifyContent="space-between">
          <NextLink href="/" passHref>
            <Heading
              as="h1"
              color="purple.500"
              fontWeight="800"
              cursor="pointer"
              size="lg"
            >
              Ecstacy
            </Heading>
          </NextLink>
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
