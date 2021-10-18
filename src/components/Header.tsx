import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  HStack,
} from '@chakra-ui/react';

interface Props {}

const Header = (props: Props) => {
  return (
    <Box borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl" py="5">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h1" color="blue.600" fontWeight="800">
            Ecstacy
          </Heading>
          <HStack
            spacing="2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading as="h2" size="md" color="gray.700" fontWeight="medium">
              Shop
            </Heading>
            <Heading as="h2" size="md" color="gray.700" fontWeight="medium">
              Sell
            </Heading>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
