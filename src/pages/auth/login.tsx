import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import NextLink from "next/link";

interface Props {}

export default function Signup({}: Props): ReactElement {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <Box maxW="sm" mx="auto">
      <Box textAlign="center" mb={{ base: "10", md: "16" }}>
        <Heading as="h1" size="xl" fontWeight="extrabold" letterSpacing="tight">
          Login to your account
        </Heading>
        <Text mt="3" color={mode("gray.600", "gray.400")} fontWeight="medium">
          Need an account?{" "}
          <NextLink passHref href="/auth/signup">
            <Link color="purple.600">Sign up!</Link>
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
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                size="lg"
                bg={mode("white", "gray.700")}
                fontSize="md"
                roundedTop="0"
                placeholder="Password"
              />
              <InputRightElement width="3.5rem">
                <IconButton
                  h="1.75rem"
                  onClick={handleClick}
                  icon={show ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  aria-label={show ? "Hide password" : "Show password"}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
        <Flex align="center" justify="space-between" mt="8">
          <Link fontSize="sm" color="red.600">
            Forgot password?
          </Link>
        </Flex>
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
            Login
          </Button>
        </LightMode>
      </form>
    </Box>
  );
}
