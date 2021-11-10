import { Flex, Heading, Spinner, Text, useToast } from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import Dashboard from "~/components/admin/Dashboard";
import { UserCard } from "~/components/admin/UserCard";
import { ProductGrid } from "~/components/ProductGrid";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { Buyer } from "~/types";

const Buyers: React.FC = () => {
  const { data, error, mutate, isValidating } = useSWR<{
    data?: Buyer[];
  }>("buyers", fetcher, {
    revalidateOnFocus: false,
  });

  const toast = useToast();
  const buyers: Buyer[] | undefined = data?.data;
  const isLoading = (!data && !error) || isValidating;

  const onBan = async (userId: string) => {
    const res = await fetcher(`users/${userId}/ban`, "POST", {});
    if (res.error) {
      toastWrapper(toast, res.error, "Error", res.error);
    } else {
      toastWrapper(toast, undefined, "Info", "Banned");
      mutate();
    }
  };

  const onUnban = async (userId: string) => {
    const res = await fetcher(`users/${userId}/unban`, "POST", {});
    if (res.error) {
      toastWrapper(toast, res.error, "Error", res.error);
    } else {
      toastWrapper(toast, undefined, "Info", "Unbanned");
      mutate();
    }
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
        <Heading size="lg" fontWeight="extrabold" mb="6">
          All Buyers
        </Heading>
        <Text fontSize="2xl" as="b" color="red">
          Error
        </Text>
      </Flex>
    );
  }

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
                key={buyer.id}
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
    </Dashboard>
  );
};

export default Buyers;
