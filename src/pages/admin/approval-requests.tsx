import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import Dashboard from "~/components/admin/Dashboard";
import { RequestCard } from "~/components/admin/RequestCard";
import { ProductGrid } from "~/components/ProductGrid";
import { fetcher } from "~/lib/api";
import { Seller } from "~/types";

const ApprovalRequest: React.FC = () => {
  const {
    data: sellers,
    error,
    mutate,
  } = useSWR<{ data?: Seller[] }>("sellers", fetcher);

  const onApprove = async (id: string) => {
    await fetcher(`sellers/${id}/approve`, "PATCH", undefined);
    mutate();
  };

  const onDeny = async (id: string) => {
    await fetcher(`sellers/${id}/deny`, "PATCH", undefined);
    mutate();
  };

  const getUnapprovedSellers = (sellers: Seller[]) =>
    sellers.filter(({ approved }) => !approved);

  return (
    <Dashboard>
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
        {!sellers && !error && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        )}
        {!!sellers?.data &&
          (getUnapprovedSellers(sellers?.data).length ? (
            <ProductGrid>
              {getUnapprovedSellers(sellers?.data).map((seller) => (
                <RequestCard
                  key={seller.id}
                  seller={seller}
                  onApprove={onApprove}
                  onDeny={onDeny}
                  downloadUrl={`${process.env.NEXT_PUBLIC_API_BASE_URL}/sellers/${seller.id}/proposal`}
                />
              ))}
            </ProductGrid>
          ) : (
            <Text>No pending seller approval requests</Text>
          ))}
        {(error || (sellers && !sellers.data)) && (
          <Text>An error occured, please try again!</Text>
        )}
      </Flex>
    </Dashboard>
  );
};

export default ApprovalRequest;
