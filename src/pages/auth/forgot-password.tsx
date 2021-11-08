import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Page from "~/components/Page";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";
import validate from "~/lib/validate";

const ForgotPassword: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const submitForgotPassword = async (values: { email: string }) => {
    setLoading(true);
    const { error } = await fetcher("auth/forgot-password", "POST", values);
    setLoading(false);
    if (!error || error.includes("already sent")) setShowUpdateForm(true);
    toast({
      position: "top",
      title: error ? "An error occured" : "Email sent!",
      description: error || "OTP email has been sent to your account",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const submitUpdatePassword = async (values: {
    otp: string;
    password: string;
  }) => {
    setLoading(true);
    const { error } = await fetcher("auth/update-password", "POST", values);
    setLoading(false);
    toast({
      position: "top",
      title: error ? "An error occured" : "Password updated!",
      description: error || "Login to your account using your new password",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
    if (!error) router.push("/auth/login");
  };

  const ForgotPasswordForm: React.FC = () => (
    <Formik initialValues={{ email: "" }} onSubmit={submitForgotPassword}>
      {() => (
        <Form>
          <Stack spacing="-px">
            <Field name="email" validate={validate.email}>
              {({ field, form }: any) => (
                <FormControl
                  id="email"
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
                    bg="white"
                    fontSize="md"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
            isLoading={loading}
          >
            Send OTP to email
          </Button>
        </Form>
      )}
    </Formik>
  );

  const UpdatePasswordForm: React.FC = () => (
    <Formik
      initialValues={{ otp: "", password: "" }}
      onSubmit={submitUpdatePassword}
    >
      {() => (
        <Form>
          <Stack spacing="-px">
            <Field
              name="otp"
              validate={(value: string) => {
                if (!value) return "OTP token is required";
              }}
            >
              {({ field, form }: any) => (
                <FormControl
                  id="otp"
                  isInvalid={form.errors.otp && form.touched.otp}
                >
                  <FormLabel srOnly htmlFor="otp">
                    OTP Token
                  </FormLabel>
                  <Input
                    size="lg"
                    name="otp"
                    type="text"
                    required
                    placeholder="OTP token"
                    bg="white"
                    fontSize="md"
                    roundedBottom="0"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.otp}</FormErrorMessage>
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
                    New password
                  </FormLabel>
                  <Input
                    size="lg"
                    name="password"
                    type="password"
                    required
                    placeholder="New password"
                    bg="white"
                    fontSize="md"
                    roundedTop="0"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
            isLoading={loading}
          >
            Update password
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Page>
      <Stack direction="column" spacing="6">
        <Heading size="lg">Reset your password</Heading>
        <Container maxWidth="40ch" padding="0">
          {showUpdateForm ? <UpdatePasswordForm /> : <ForgotPasswordForm />}
        </Container>
      </Stack>
    </Page>
  );
};

export default ForgotPassword;
