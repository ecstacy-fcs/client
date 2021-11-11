import { Button } from "@chakra-ui/button";
import { Container, Heading, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";

const VerifyEmail: React.FC<{
  user: {
    id: string;
    name: string;
    email: string;
    verified: boolean;
  };
}> = ({ user }) => {
  const { mutate, isLoading } = useUser();
  const toast = useToast();
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);
  const resendVerificationEmail = async () => {
    setSendingEmail(true);
    const { data, error } = await fetcher(
      "auth/resend-verification-email",
      "POST"
    );
    setSendingEmail(false);
    toastWrapper(
      toast,
      error,
      "Email sent",
      "Verification email has been resent to your email ID"
    );
    if (!error || error?.includes("already sent")) setVerificationSent(true);
  };
  return (
    <Container centerContent flex="1" paddingY="10">
      <Stack direction="column" spacing="6">
        <Heading size="lg">Verify your Email</Heading>
        <Text lineHeight="tall">
          We have sent an email to <strong>{user.email}</strong> with your
          verification link. Please verify your account before using Ecstacy.
          Thanks!
        </Text>
        <Stack direction="row" display="flex">
          <Button onClick={() => mutate()} isLoading={isLoading} flex="1">
            Check verification
          </Button>
          {!verificationSent && (
            <Button
              colorScheme="purple"
              onClick={resendVerificationEmail}
              isLoading={sendingEmail}
              flex="1"
            >
              Resend verification email
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default VerifyEmail;
