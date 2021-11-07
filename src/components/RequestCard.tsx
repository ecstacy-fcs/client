import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    HStack,
    Image,
    Link,
    Skeleton,
    Stack,
    StackProps,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from "@chakra-ui/react";
  import * as React from "react";
  import { PriceTag } from "./PriceTag";
  import { Product, Seller } from "../types";
  
  interface Props {
    seller: Seller;
    onApprove: (id: string) => void;
    onDeny: (id: string) => void;
    rootProps?: StackProps;
  }
  
  export const RequestCard = (props: Props) => {
    const { seller, rootProps } = props;
    const { name, email } = seller.user;
    return (
      <Stack borderWidth='1px' borderColor='gray.400' padding='3' borderRadius='10px' maxWidth='fit-content' spacing={useBreakpointValue({ base: "4", md: "5" })} {...rootProps}>
        <Box position="relative" maxWidth='20' alignSelf='center'>
            <Avatar
              bg='teal.500'
              size=''
              mb="2"/>
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text
              fontWeight="medium"
              color={useColorModeValue("gray.700", "gray.400")}
            >
              {name}
            </Text>
            <Text
                fontWeight="medium"
                color={useColorModeValue("gray.700", "gray.400")}
            >
                {email}
            </Text>
          </Stack>
        </Stack>
        <Stack spacing="3" align="center">
          <Button colorScheme="purple" isFullWidth>
            Download KYC
          </Button>
          <HStack spacing="5" width="100%">
          <Button variant='outline' colorScheme="green" isFullWidth onClick={() => props.onApprove(seller.id)}>
            Approve
          </Button>
          <Button variant='outline' colorScheme="red" isFullWidth onClick={() => props.onDeny(seller.id)}>
            Deny
          </Button>
          </HStack>
        </Stack>
      </Stack>
    );
  };
  