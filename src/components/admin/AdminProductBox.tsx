import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useAllProducts } from "~/hooks/useAllProducts";
import { fetcher } from "~/lib/api";
import { ProductGrid } from "../ProductGrid";
import { AdminProductCard } from "./AdminProductCard";

const AdminProductBox = (props: any) => {
  const { products, error, mutate, isLoading } = useAllProducts();

  const onBan = async (productId: string) => {
    await fetcher(`products/${productId}/ban`, "POST", {});
    mutate();
  };

  const onUnban = async (productId: string) => {
    await fetcher(`products/${productId}/unban`, "POST", {});
    mutate();
  };

  if (error || (!products && !isLoading)) {
    return (
      <Flex
        direction="column"
        flex="1"
        overflow="auto"
        px="10"
        pt={{ md: 1, base: 1 }}
      >
        <Heading size="lg" fontWeight="extrabold" mb="6">
          All Products
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
        All Products
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
          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              buttonText={product.banned ? "Unban" : "Ban"}
              buttonColor={product.banned ? "green" : "red"}
              onButtonClick={() =>
                product.banned ? onUnban(product.id) : onBan(product.id)
              }
            />
          ))}
        </ProductGrid>
      )}
    </Flex>
  );
};

export default AdminProductBox;