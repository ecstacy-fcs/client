import { Flex, Heading, Box, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import { useAllProducts } from "~/hooks/useAllProducts";
import { useBuyers } from "~/hooks/useBuyers";
import { fetcher } from "~/lib/api";
import { AdminProductCard } from "./AdminProductCard";
import { ProductGrid } from "./ProductGrid";
import { UserCard } from "./UserCard";



const AdminProductBox = (props: any) => {
    const {products, error, mutate, isLoading} = useAllProducts();

    const onBan = async (productId: string) => {
        await fetcher(`products/${productId}/ban`,'POST', {});
        mutate();
    };

    const onUnban = async (productId: string) => {
        await fetcher(`products/${productId}/unban`,'POST', {});
        mutate();
    };

    if(error || !products && !isLoading) {
        return (
            <Flex
            direction="column"
            flex="1"
            overflow="auto"
            px="10"
            pt={{ md: 1, base: 1 }}
          >
            <Heading mb={5} color={mode("gray.700", "gray.400")}>
              All Products
            </Heading>
            <Box
              flex="1"
              borderWidth="3px"
              borderStyle="dashed"
              rounded="xl"
              p='10'
            >
            <div>Error</div>
            </Box>
          </Flex>
        )
    }
    if(isLoading) {
        return ( <Flex
            direction="column"
            flex="1"
            overflow="auto"
            px="10"
            pt={{ md: 1, base: 1 }}
          >
            <Heading mb={5} color={mode("gray.700", "gray.400")}>
              All Products
            </Heading>
            <Box
              flex="1"
              borderWidth="3px"
              borderStyle="dashed"
              rounded="xl"
              p='10'
            >
            <div> Loading </div>
            </Box>
          </Flex>)
    }
    return(
        <Flex
        direction="column"
        flex="1"
        overflow="auto"
        px="10"
        pt={{ md: 1, base: 1 }}
      >
        <Heading mb={5} color={mode("gray.700", "gray.400")}>
          All Products
        </Heading>
        <Box
          flex="1"
          borderWidth="3px"
          borderStyle="dashed"
          rounded="xl"
          p='10'
        >
          <ProductGrid >
                {products.map((product) => (
                    <AdminProductCard key={product.id} product={product}  onUnban={() => onUnban(product.id)} onBan={() => onBan(product.id)}/>
                ))}
            </ProductGrid>
        </Box>
      </Flex>
    )

}

export default AdminProductBox;