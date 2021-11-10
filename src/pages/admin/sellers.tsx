import { Flex, Heading, Spinner, Text, useToast } from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import Dashboard from "~/components/admin/Dashboard";
import { UserCard } from "~/components/admin/UserCard";
import { ProductGrid } from "~/components/ProductGrid";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { Seller } from "~/types";

const Sellers: React.FC = () => {
  const {
    data: sellers,
    error,
    mutate,
  } = useSWR<{ data?: Seller[] }>("sellers", fetcher);
  const toast = useToast();

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

  const getApprovedSellers = (sellers: Seller[]) =>
    sellers.filter(({ approved }) => approved);

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
          All Sellers
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
          (getApprovedSellers(sellers?.data).length ? (
            <ProductGrid>
              {getApprovedSellers(sellers?.data).map((seller) => (
                <UserCard
                  key={seller.id}
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
              ))}
            </ProductGrid>
          ) : (
            <Text>No sellers found</Text>
          ))}
        {(error || (sellers && !sellers.data)) && (
          <Text>An error occured, please try again!</Text>
        )}
      </Flex>
    </Dashboard>
  );
};

export default Sellers;
