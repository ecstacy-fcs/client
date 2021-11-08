import { Flex, Heading, Box, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import { useApprovalRequests } from "~/hooks/useApprovalRequests";
import { useSellers } from "~/hooks/useSellers";
import { fetcher } from "~/lib/api";
import { ProductGrid } from "./ProductGrid";
import { RequestCard } from "./RequestCard";
import { UserCard } from "./UserCard";



const AdminSellerDeleteBox = (props: any) => {
    const {sellers, error, isLoading, mutate} = useSellers();

    const onBan = async (userId: string, sellerId: string) => {
        await fetcher(`users/${userId}/ban`,'POST', {});
        mutate();
    };

    const onUnban = async (userId: string, sellerId: string) => {
        await fetcher(`users/${userId}/unban`,'POST', {});
        mutate();
    };


    if(error || !sellers) {
        return (
            <Flex
            direction="column"
            flex="1"
            overflow="auto"
            px="10"
            pt={{ md: 1, base: 1 }}
          >
            <Heading mb={5} color={mode("gray.700", "gray.400")}>
              All Sellers
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
              All Sellers
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
          All Sellers
        </Heading>
        <Box
          flex="1"
          borderWidth="3px"
          borderStyle="dashed"
          rounded="xl"
          p='10'
        >
          <ProductGrid >
                {sellers.map((seller) => (
                    <UserCard key={seller.id} user={seller.user} onUnban={(userId: string) => onUnban(userId, seller.id)} onBan={(userId: string) => onBan(userId,seller.id)}/>
                ))}
            </ProductGrid>
        </Box>
      </Flex>
    )

}

export default AdminSellerDeleteBox;