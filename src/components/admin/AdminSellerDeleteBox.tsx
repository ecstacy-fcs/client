import {
  Box,
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
import { UserCard } from "./UserCard";

const AdminSellerDeleteBox = (props: any) => {
  const { sellers, error, isLoading, mutate } = useSellers();

  const onBan = async (userId: string) => {
    await fetcher(`users/${userId}/ban`, "POST", {});
    mutate();
  };

  const onUnban = async (userId: string) => {
    await fetcher(`users/${userId}/unban`, "POST", {});
    mutate();
  };

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
          All Sellers
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
        All Sellers
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
            if (seller.approved)
              return (
                <UserCard
                  name={seller.user.name}
                  email={seller.user.email}
                  buttonText={seller.user.banned ? "Unban" : "Ban"}
                  buttonColor={seller.user.banned ? "green" : "red"}
                  onButtonClick={() => {
                    seller.user.banned
                      ? onUnban(seller.user.id)
                      : onBan(seller.user.id);
                  }}
                />
              );
          })}
        </ProductGrid>
      )}
    </Flex>
  );
};

export default AdminSellerDeleteBox;
