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
import validate from "~/lib/validate";
import url from "~/lib/url";

interface Props {}

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup({}: Props): ReactElement {
  const onSignUp = async (values: SignUpData) => {
    const result = await fetch(`http://localhost:5000/auth/register`, {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: values.fullName,
        email: values.email,
        password: values.password,
      }),
    });
    const res = await result.json();
    console.log(res);
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
        onSubmit={onSignUp}
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
