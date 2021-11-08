import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactElement;
}

const Page = (props: Props) => {
  return (
    <Flex
      direction="column"
      flex="1"
      overflow="hidden"
      width="100%"
      height="100%"
      bg={"gray.50"}
    >
      <Box
        overflowY="auto"
        flex="1"
        py={{ base: "10", md: "16" }}
        px={{ base: "6", md: "10" }}
      >
        <Container maxW="container.lg">{props.children}</Container>
      </Box>
    </Flex>
  );
};

export default Page;
