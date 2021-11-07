import { Flex, Heading, Box, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import { useApprovalRequests } from "~/hooks/useApprovalRequests";
import { fetcher } from "~/lib/api";
import { ProductGrid } from "./ProductGrid";
import { RequestCard } from "./RequestCard";


// react functional component
const AdminApprovalRequestBox = (props: any) => {
    const {approvalRequests, error, isLoading, mutate} = useApprovalRequests();
    const onApprove = async (id: string) => {
    await fetcher(`sellers/${id}/approve`, 'PATCH',undefined)
        mutate();
        console.log("Approve", id);
    };
    
    if(error) {
        return (
            <Flex
            direction="column"
            flex="1"
            overflow="auto"
            px="10"
            pt={{ md: 1, base: 1 }}
          >
            <Heading mb={5} color={mode("gray.700", "gray.400")}>
              Approval Requests
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
              Approval Requests
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
          Approval Requests
        </Heading>
        <Box
          flex="1"
          borderWidth="3px"
          borderStyle="dashed"
          rounded="xl"
          p='10'
        >
          <ProductGrid >
                {approvalRequests.map((approvalRequest) => (
                    <RequestCard key={approvalRequest.id} seller={approvalRequest} onApprove={onApprove} onDeny={onDeny} />
                ))}
            </ProductGrid>
        </Box>
      </Flex>
    )

    const onDeny = async (id: string) => {
        await fetcher(`sellers/${id}/deny`, 'PATCH',undefined)
        mutate();
        console.log("Deny", id);
    };
      
}

export default AdminApprovalRequestBox;