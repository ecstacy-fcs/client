import {
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Buyer } from "~/types";
import { ProductGrid } from "../ProductGrid";
import { UserCard } from "./UserCard";

const AdminBuyerDeleteBox = (props: any) => {
  const { data, error, mutate, isValidating } = useSWR<{
    data?: Buyer[];
  }>("buyers", fetcher, {
    revalidateOnFocus: false,
  });

  const buyers: Buyer[] | undefined = data?.data;
  const isLoading = (!data && !error) || isValidating;

  const onBan = async (userId: string) => {
    await fetcher(`users/${userId}/ban`, "POST", {});
    mutate();
  };

  const onUnban = async (userId: string) => {
    await fetcher(`users/${userId}/unban`, "POST", {});
    mutate();
  };

  if (error || (!buyers && !isLoading)) {
    return (
      <Flex
        direction="column"
        flex="1"
        overflow="auto"
        px="10"
        pt={{ md: 1, base: 1 }}
      >
        <Heading mb={5} color={mode("gray.700", "gray.400")}>
          All Buyers
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
      <Heading mb={5} color={mode("gray.700", "gray.400")}>
        All Buyers
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
          {buyers?.map((buyer) => (
            <UserCard
              name={buyer.user.name}
              email={buyer.user.email}
              buttonText={buyer.user.banned ? "Unban" : "Ban"}
              buttonColor={buyer.user.banned ? "green" : "red"}
              onButtonClick={() => {
                buyer.user.banned
                  ? onUnban(buyer.user.id)
                  : onBan(buyer.user.id);
              }}
            />
          ))}
        </ProductGrid>
      )}
    </Flex>
  );
};

export default AdminBuyerDeleteBox;
