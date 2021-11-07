import {
    AspectRatio,
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
    rootProps?: StackProps;
  }
  
  export const RequestCard = (props: Props) => {
    const { seller, rootProps } = props;
    const { name, email, kyc, avatar } = seller;
    return (
      <Stack spacing={useBreakpointValue({ base: "4", md: "5" })} {...rootProps}>
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={avatar}
              alt={name}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
            />
          </AspectRatio>
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
          <Button variant='outline' colorScheme="green" isFullWidth>
            Approve
          </Button>
          <Button variant='outline' colorScheme="red" isFullWidth>
            Deny
          </Button>
          </HStack>
        </Stack>
      </Stack>
    );
  };
  