import React, { ReactElement, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  IconButton,
  Input,
  Button,
  VStack,
  Link,
  Text,
  InputRightElement,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';

interface Props {}

export default function Login({}: Props): ReactElement {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
            <Input type="email" placeholder="Enter email address" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color="gray.800">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
              />
              <InputRightElement width="3.5rem">
                <IconButton
                  h="1.75rem"
                  onClick={handleClick}
                  icon={show ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  aria-label={show ? 'Hide password' : 'Show password'}
                />
              </InputRightElement>
            </InputGroup>
            <Link fontSize="sm" color="red.600">
              Forgot password?
            </Link>
          </FormControl>
          <Button colorScheme="purple">Log In</Button>
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
              Sign Up
            </Button>
          </NextLink>
        </VStack>
      </Container>
    </Box>
  );
}
