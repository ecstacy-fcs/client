import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  LightMode,
  Stack,
  Link,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import NextLink from "next/link";

interface Props {}

export default function Signup({}: Props): ReactElement {
  return (
    <Flex
      direction="column"
      flex="1"
      overflow="hidden"
      width="100%"
      height="100%"
      bg={mode("gray.50", "inherit")}
    >
      <Box
        overflowY="auto"
        flex="1"
        py={{ base: "10", md: "16" }}
        px={{ base: "6", md: "10" }}
      >
        <Box maxW="sm" mx="auto">
          <Box textAlign="center" mb={{ base: "10", md: "16" }}>
            <Heading
              as="h1"
              size="xl"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Create an account!
            </Heading>
            <Text
              mt="3"
              color={mode("gray.600", "gray.400")}
              fontWeight="medium"
            >
              Already have one?{" "}
              <NextLink href="/auth/login" passHref>
                <Link color="purple.600">Login!</Link>
              </NextLink>
            </Text>
          </Box>
          <form
            onSubmit={(e) => {
              // add submit logic here
              e.preventDefault();
            }}
          >
            <Stack spacing="-px">
              <FormControl id="email-address">
                <FormLabel srOnly>Email address</FormLabel>
                <Input
                  size="lg"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  bg={mode("white", "gray.700")}
                  fontSize="md"
                  roundedBottom="0"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel srOnly>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  size="lg"
                  bg={mode("white", "gray.700")}
                  fontSize="md"
                  rounded="0"
                  placeholder="Password"
                />
              </FormControl>
              <FormControl id="confirm-password">
                <FormLabel srOnly>Confirm password</FormLabel>
                <Input
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  size="lg"
                  bg={mode("white", "gray.700")}
                  fontSize="md"
                  roundedTop="0"
                  placeholder="Confirm password"
                />
              </FormControl>
            </Stack>
            <LightMode>
              <Button
                size="lg"
                type="submit"
                mt="8"
                w="full"
                colorScheme="purple"
                fontSize="md"
                fontWeight="bold"
              >
                Sign up
              </Button>
            </LightMode>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
