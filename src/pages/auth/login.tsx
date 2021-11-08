import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Page from "~/components/Page";
import { useAuth } from "~/hooks/useAuth";
import { useUser } from "~/hooks/useUser";
import { toastWrapper } from "~/lib/toast";
import validate from "~/lib/validate";
import { LoginData } from "../../types";

interface Props {}

export default function Signup({}: Props): ReactElement {
  const { login } = useAuth();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { user } = useUser();

  const submit = async (values: LoginData) => {
    setLoading(true);
    const success = await login(values);
    setLoading(false);
    if (success) router.push("/");
  };

  useEffect(() => {
    const { query, replace } = router;
    if (user?.verified) replace("/");
    if (query.verified) {
      toastWrapper(
        toast,
        undefined,
        "Email verified!",
        "Your email ID has been verified, please login"
      );
    }
  }, [router.query, user]);

  return (
    <Page>
      <Box maxW="sm" mx="auto">
        <Box textAlign="center" mb={{ base: "10", md: "16" }}>
          <Heading
            as="h1"
            size="xl"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Login to your account
          </Heading>
          <Text mt="3" color={mode("gray.600", "gray.400")} fontWeight="medium">
            Need an account?{" "}
            <NextLink passHref href="/auth/signup">
              <Link color="purple.600">Sign up!</Link>
            </NextLink>
          </Text>
        </Box>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={submit}>
          {(props) => (
            <Form>
              <Stack spacing="-px">
                <Field name="email" validate={validate.email}>
                  {({ field, form }: any) => (
                    <FormControl
                      id="email-address"
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel srOnly htmlFor="email">
                        Email address
                      </FormLabel>
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
                        Password
                      </FormLabel>
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
                          {...field}
                        />
                        <InputRightElement width="3.5rem">
                          <IconButton
                            h="1.75rem"
                            onClick={handleClick}
                            icon={show ? <IoEyeOffSharp /> : <IoEyeSharp />}
                            aria-label={
                              show ? "Hide password" : "Show password"
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Flex align="center" justify="space-between" mt="8">
                <Link
                  fontSize="sm"
                  color="red.600"
                  href="/auth/forgot-password"
                >
                  Forgot password?
                </Link>
              </Flex>
              <Button
                size="lg"
                type="submit"
                mt="8"
                w="full"
                colorScheme="purple"
                fontSize="md"
                fontWeight="bold"
                isLoading={loading}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Page>
  );
}
