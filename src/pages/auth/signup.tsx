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
  FormErrorMessage,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import NextLink from "next/link";
import { Formik, Form, Field } from "formik";

interface Props {}

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup({}: Props): ReactElement {
  const validate = {
    fullName: (value: string) => {
      let error;
      if (!value) {
        error = "Required";
      } else if (value.length > 50) {
        error = "Must be 50 characters or less.";
      }
      return error;
    },
    email: (value: string) => {
      let error;
      if (!value) {
        error = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Invalid email address";
      } else if (value.length > 320) {
        error = "Must be 320 characters or less";
      }
      return error;
    },
    password: (value: string) => {
      let error;
      if (!value) {
        error = "Required";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,22}$/.test(
          value
        )
      ) {
        error =
          "Invalid password. Password must have between 8-22 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
      }
      return error;
    },
    confirmPassword: (value: string, password: string) => {
      let error;
      if (!value) {
        error = "Required";
      } else if (password !== value) {
        error = "Passwords don't match.";
      }
      return error;
    },
  };

  return (
    <Box maxW="sm" mx="auto">
      <Box textAlign="center" mb={{ base: "10", md: "16" }}>
        <Heading as="h1" size="xl" fontWeight="extrabold" letterSpacing="tight">
          Create an account!
        </Heading>
        <Text mt="3" color={mode("gray.600", "gray.400")} fontWeight="medium">
          Already have one?{" "}
          <NextLink href="/auth/login" passHref>
            <Link color="purple.600">Login!</Link>
          </NextLink>
        </Text>
      </Box>
      <Formik
        initialValues={
          {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          } as SignUpData
        }
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          console.log(values);
        }}
      >
        {(props) => (
          <Form>
            <Stack spacing="-px">
              <Field name="fullName" validate={validate.fullName}>
                {({ field, form }: any) => (
                  <FormControl
                    id="fullName"
                    isInvalid={form.errors.fullName && form.touched.fullName}
                  >
                    <FormLabel srOnly htmlFor="fullName">
                      Full Name
                    </FormLabel>
                    <Input
                      size="lg"
                      name="fullName"
                      type="name"
                      autoComplete="name"
                      required
                      placeholder="Full Name"
                      bg={mode("white", "gray.700")}
                      fontSize="md"
                      roundedBottom="0"
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email" validate={validate.email}>
                {({ field, form }: any) => (
                  <FormControl
                    id="email"
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel srOnly htmlFor="email">
                      Full Name
                    </FormLabel>
                    <Input
                      size="lg"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Email Address"
                      bg={mode("white", "gray.700")}
                      fontSize="md"
                      rounded="0"
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validate.password}>
                {({ field, form }: any) => (
                  <FormControl
                    id="password"
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel srOnly htmlFor="password">
                      Full Name
                    </FormLabel>
                    <Input
                      size="lg"
                      name="password"
                      type="password"
                      autoComplete="password"
                      required
                      placeholder="Password"
                      bg={mode("white", "gray.700")}
                      fontSize="md"
                      rounded="0"
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field
                name="confirmPassword"
                validate={(value: string) =>
                  validate.confirmPassword(value, props.values.password)
                }
              >
                {({ field, form }: any) => (
                  <FormControl
                    id="confirmPassword"
                    isInvalid={
                      form.errors.confirmPassword &&
                      form.touched.confirmPassword
                    }
                  >
                    <FormLabel srOnly htmlFor="confirmPassword">
                      Full Name
                    </FormLabel>
                    <Input
                      size="lg"
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirmPassword"
                      required
                      placeholder="Confirm Password"
                      bg={mode("white", "gray.700")}
                      fontSize="md"
                      roundedTop="0"
                      {...field}
                    />
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
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
          </Form>
        )}
      </Formik>
    </Box>
  );
}
