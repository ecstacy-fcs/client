import { Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Footer = (props: Props) => {
  return (
    <Box borderTop="1px" borderColor="gray.200">
      <Container maxW="container.lg" py="5" centerContent>
        <Flex w="full" direction="row" justify="space-between">
          <HStack spacing="5px">
            <Text fontWeight="medium">Made by</Text>
            <Text color="purple.500" fontWeight="bold">
              MDMA
            </Text>
          </HStack>
          <Link href="/privacy-policy" color="purple.500">
            Privacy Policy
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
