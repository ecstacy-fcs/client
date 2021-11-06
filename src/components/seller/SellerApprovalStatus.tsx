import { Stack, Tag, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {
  approved: boolean;
}

function SellerApprovalStatus({ approved }: Props): ReactElement {
  return (
    <Stack direction="column">
      {approved ? (
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
            You can add products in the "Add a Product" tab on the left panel.
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
            You will be able to add products once you are approved by an admin.
          </Text>
        </>
      )}
    </Stack>
  );
}

export default SellerApprovalStatus;
