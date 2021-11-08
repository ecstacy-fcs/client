import { Avatar } from "@chakra-ui/avatar";
import { Container, Heading, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Page from "~/components/Page";
import { useAuth } from "~/hooks/useAuth";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";
interface UserData {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
}

const ProfilePage: React.FC = () => {
  const { user, isLoading, mutate } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [userData, setUserData] = useState<UserData>();
  const [loadingUserData, setLoadingUserData] = useState<boolean>(false);
  const [updatingUserData, setUpdatingUserData] = useState<boolean>(false);
  const [requestDeleteUser, setRequestDeleteUser] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);

  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        position: "top",
        title: "Login required",
        description: "You must login to view the profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
      return;
    }
    getUserData();
  }, [user, isLoading]);

  const getUserData = async () => {
    if (!user) return;
    setLoadingUserData(true);
    const { data, error } = await fetcher<UserData>(`users/${user.id}`);
    setLoadingUserData(false);
    if (error) {
      toast({
        position: "top",
        title: "An error occured",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setUserData(data);
  };

  const updateUser = async (values: UserData) => {
    if (!user) return;
    setUpdatingUserData(true);
    const { error } = await fetcher(`users/${user.id}`, "PATCH", values);
    toast({
      position: "top",
      title: error ? "An error occured" : "Success",
      description: error || "Profile updated!",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
    setUpdatingUserData(false);
    if (!error) mutate();
  };

  const requestDelete = async () => {
    setRequestDeleteUser(true);
    const { error } = await fetcher("users/request-delete", "POST");
    setRequestDeleteUser(false);
    if (!error || error.includes("already sent")) setShowDeleteForm(true);
    toast({
      position: "top",
      title: error ? "An error occured" : "Email sent!",
      description: error || "OTP email has been sent to your account!",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteAccount = async (values: { otp: string }) => {
    if (!user) return;
    setRequestDeleteUser(true);
    const { error } = await fetcher(`users/${user.id}`, "DELETE", values);
    setRequestDeleteUser(false);
    toast({
      position: "top",
      title: error ? "An error occured" : "Account deleted",
      description: error || "Your account has been deleted!",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
    if (!error) {
      window.location.href = "/";
    }
  };

  const requiredValidator = (value: string) => !value && "Required";

  const UserEditor: React.FC = () => (
    <Formik
      initialValues={
        {
          name: userData?.name,
          address: userData?.address,
          phoneNumber: userData?.phoneNumber,
        } as UserData
      }
      onSubmit={updateUser}
    >
      {() => (
        <Form>
          <Stack spacing="-px">
            <Field name="name" validate={requiredValidator}>
              {({ field, form }: any) => (
                <FormControl
                  id="name"
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel srOnly htmlFor="name">
                    Name
                  </FormLabel>
                  <Input
                    size="lg"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    bg="white"
                    fontSize="md"
                    roundedBottom="0"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="phoneNumber"
              validate={(value: string) => {
                if (!value) return "Required";
                if (value.trim().length !== 10 || !/\d*/.test(value.trim()))
                  return "Phone number should be 10 digits long";
              }}
            >
              {({ field, form }: any) => (
                <FormControl
                  id="phoneNumber"
                  isInvalid={
                    form.errors.phoneNumber && form.touched.phoneNumber
                  }
                >
                  <FormLabel srOnly htmlFor="phoneNumber">
                    Phone number
                  </FormLabel>
                  <Input
                    size="lg"
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone number"
                    bg="white"
                    fontSize="md"
                    required
                    roundedBottom="0"
                    roundedTop="0"
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="address" validate={requiredValidator}>
              {({ field, form }: any) => (
                <FormControl
                  id="address"
                  isInvalid={form.errors.address && form.touched.address}
                >
                  <FormLabel srOnly htmlFor="address">
                    Address
                  </FormLabel>
                  <Input
                    size="lg"
                    name="address"
                    type="text"
                    placeholder="Address"
                    bg="white"
                    fontSize="md"
                    roundedTop="0"
                    required
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.address}</FormErrorMessage>
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
            isLoading={updatingUserData}
          >
            Update profile data
          </Button>
        </Form>
      )}
    </Formik>
  );

  const DeleteForm: React.FC = () => (
    <Formik initialValues={{ otp: "" }} onSubmit={deleteAccount}>
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
                    {...field}
                  />
                  <FormErrorMessage>{form.errors.otp}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Stack>
          <Button
            size="lg"
            type="submit"
            mt="8"
            w="full"
            colorScheme="red"
            fontSize="md"
            fontWeight="bold"
            isLoading={requestDeleteUser}
          >
            Delete my account
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Page>
      <Stack spacing="12">
        <Stack direction="column" spacing="6">
          <Heading size="lg">Profile</Heading>
          {loadingUserData ? (
            <Container centerContent maxWidth="unset" padding="20">
              <Stack direction="row" spacing="5" alignItems="center">
                <Spinner />
                <Text>Getting your data...</Text>
              </Stack>
            </Container>
          ) : (
            <Stack direction="row" spacing="10">
              <Avatar size="xl" name={userData?.name} />
              <UserEditor />
            </Stack>
          )}
        </Stack>
        <Stack spacing="6">
          <Heading size="md" as="h2">
            Danger actions
          </Heading>
          <Container padding="0" lineHeight="tall">
            <Heading size="base" as="h3">
              Delete account
            </Heading>
            <Text>
              Once deleted, you won't be able to sign in. To reactivate the
              account, you will have to re-register using the same email ID
            </Text>
            {showDeleteForm ? (
              <Container mt="8" maxWidth="40ch" padding="0">
                <DeleteForm />
              </Container>
            ) : (
              <Button
                size="lg"
                mt="5"
                w="full"
                colorScheme="red"
                fontSize="md"
                fontWeight="bold"
                isLoading={requestDeleteUser}
                onClick={requestDelete}
              >
                Request to Delete Account
              </Button>
            )}
          </Container>
        </Stack>
      </Stack>
    </Page>
  );
};

export default ProfilePage;
