import {
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useSellers } from "~/hooks/useSellers";
import { fetcher } from "~/lib/api";
import { ProductGrid } from "../ProductGrid";
import { RequestCard } from "./RequestCard";

const AdminApprovalRequestBox = (props: any) => {
  const { sellers, isLoading, error, mutate } = useSellers();

  const onApprove = async (id: string) => {
    await fetcher(`sellers/${id}/approve`, "PATCH", undefined);
    mutate();
    console.log("Approve", id);
  };

  const onDeny = async (id: string) => {
    await fetcher(`sellers/${id}/deny`, "PATCH", undefined);
    mutate();
    console.log("Deny", id);
  };

  React.useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  });

  if (error || (!sellers && !isLoading)) {
    return (
      <Flex
        direction="column"
        flex="1"
        overflow="auto"
        px="10"
        pt={{ md: 1, base: 1 }}
      >
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Approval Requests
        </Heading>
        <Text fontSize="2xl" as="b" color="red">
          Error
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      flex="1"
      overflow="auto"
      px="10"
      pt={{ md: 1, base: 1 }}
    >
      <Heading size="lg" fontWeight="extrabold" mb="6">
        Approval Requests
      </Heading>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
      ) : (
        <ProductGrid>
          {sellers.map((seller) => {
            if (!seller.approved)
              return (
                <RequestCard
                  key={seller.id}
                  seller={seller}
                  onApprove={onApprove}
                  onDeny={onDeny}
                  downloadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/sellers/${seller.id}/proposal`}
                />
              );
          })}
        </ProductGrid>
      )}
    </Flex>
  );
};

export default AdminApprovalRequestBox;
