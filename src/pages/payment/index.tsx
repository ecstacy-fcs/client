import {
  Box,
  Heading,
  Link,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Page from "~/components/Page";

export default function Component() {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if (query.status === "success") {
      setIsLoading(false);
    } else if (query.status === "failure") {
      setError(true);
      setIsLoading(false);
    }
  }, [query]);

  return isLoading ? (
    <Page>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.600"
          size="xl"
        />
      </Box>
    </Page>
  ) : error ? (
    <Page>
      <Box textAlign="center" mb={{ base: "10" }} mx="auto">
        <Heading
          mt={10}
          mb={5}
          color={useColorModeValue("gray.700", "gray.400")}
        >
          Looks like something went wrong.
        </Heading>
        <Text
          mt="3"
          color={useColorModeValue("gray.600", "gray.400")}
          fontWeight="medium"
          fontSize="17"
        >
          <NextLink passHref href="/">
            <Link fontSize="20" color="purple.600">
              Go back to home?
            </Link>
          </NextLink>
        </Text>
      </Box>
    </Page>
  ) : (
    <Page>
      <Box textAlign="center" mb={{ base: "10" }} mx="auto">
        <Heading
          mt={10}
          mb={5}
          color={useColorModeValue("gray.700", "gray.400")}
        >
          Thank you for shopping with us!
        </Heading>

        <Text
          mt="3"
          color={useColorModeValue("gray.600", "gray.400")}
          fontWeight="medium"
          fontSize="20"
        >
          Your payment was processed successfully.{" "}
          <NextLink passHref href="/">
            <Link fontSize="20" color="purple.600">
              Go back to home?
            </Link>
          </NextLink>
        </Text>
      </Box>
    </Page>
  );
}
