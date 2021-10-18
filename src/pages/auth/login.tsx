import React, { ReactElement } from 'react';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  VStack,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
interface Props {}

export default function Login({}: Props): ReactElement {
  return (
    <Box height="100%" width="100%">
      <Container size="container.lg" centerContent>
        <VStack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing="1.25rem"
          boxSize="md"
        >
          <Heading color="gray.600" size="lg">
            Log In
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel color="gray.800">Email Address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color="gray.800">Password</FormLabel>
            <Input type="password" />
            <Link fontSize="sm" color="red.600">
              Forgot password?
            </Link>
          </FormControl>
          <Button colorScheme="purple">Login</Button>
        </VStack>
        <VStack
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing="1.25rem"
        >
          <Text color="gray.800" fontWeight="medium">
            Don't have an account?
          </Text>
          <NextLink href="/auth/signup">
            <Button variant="outline" colorScheme="purple">
              Sign up
            </Button>
          </NextLink>
        </VStack>
      </Container>
    </Box>
  );
}
