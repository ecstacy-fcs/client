import { Heading, Spinner, Stack, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "~/components/seller/Dashboard";
import { useSeller } from "~/hooks/useSeller";

const SellerIndex: React.FC = () => {
  const { seller, isLoading } = useSeller();
  const router = useRouter();

  useEffect(() => {
    if (!seller && !isLoading) router.replace("/seller/upload-proposal");
  }, [seller]);

  return (
    <Dashboard>
      <>
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Dashboard
        </Heading>
        <Stack direction="column">
          {!seller ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          ) : seller.approved ? (
            <>
              <Stack direction="row" alignItems="center">
                <Text>
                  Your <strong>Seller Approval Status</strong> is:
                </Text>
                <Tag size="lg" colorScheme="green" alignSelf="start">
                  APPROVED
                </Tag>
              </Stack>
              <Text>
                You can add products in the "Add a Product" tab on the left
                panel.
              </Text>
            </>
          ) : (
            <>
              <Stack direction="row" alignItems="center">
                <Text>
                  Your <strong>Seller Approval Status</strong> is:
                </Text>
                <Tag size="lg" colorScheme="orange" alignSelf="start">
                  PENDING
                </Tag>
              </Stack>
              <Text>
                You will be able to add products once you are approved by an
                admin.
              </Text>
            </>
          )}
        </Stack>
      </>
    </Dashboard>
  );
};

export default SellerIndex;
