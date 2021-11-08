import { Flex, Heading, Box, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import { useApprovalRequests } from "~/hooks/useApprovalRequests";
import { useBuyers } from "~/hooks/useBuyers";
import { useSellers } from "~/hooks/useSellers";
import { fetcher } from "~/lib/api";
import { ProductGrid } from "./ProductGrid";
import { RequestCard } from "./RequestCard";
import { UserCard } from "./UserCard";



const AdminBuyerDeleteBox = (props: any) => {
    const {buyers, error, isLoading, mutate} = useBuyers();

    const onBan = async (userId: string, buyerId: string) => {
        await fetcher(`users/${userId}`,'DELETE', {});
        await fetcher(`buyers/${buyerId}`,'DELETE', {});
        mutate();
    };


    if(error || !buyers) {
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
              All Buyers
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
          All Buyers
        </Heading>
        <Box
          flex="1"
          borderWidth="3px"
          borderStyle="dashed"
          rounded="xl"
          p='10'
        >
          <ProductGrid >
                {buyers.map((buyer) => (
                    <UserCard key={buyer.id} user={buyer.user} onBan={(userId: string) => onBan(userId,buyer.id)}/>
                ))}
            </ProductGrid>
        </Box>
      </Flex>
    )

}

export default AdminBuyerDeleteBox;