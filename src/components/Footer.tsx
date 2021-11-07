import { Box, Container, HStack, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const Footer = (props: Props) => {
  return (
    <Box borderTop="1px" borderColor="gray.200">
      <Container maxW="container.lg" py="5" centerContent>
        <HStack spacing="5px">
          <Text fontWeight="medium">Made by</Text>
          <Text color="purple.500" fontWeight="bold">
            MDMA
          </Text>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
