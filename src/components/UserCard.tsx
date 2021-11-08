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
  import { Product, Seller, User } from "../types";
  
  interface Props {
    user: User;
    onBan: (userId: string) => void;
    onUnban: (userId: string) => void;
    rootProps?: StackProps;
  }
  
  export const UserCard = (props: Props) => {
    const { user, rootProps } = props;
    const { name, email } = user;

    if(user.banned){
        return (
            <Stack backgroundColor='red.50' borderWidth='1px' borderColor='red.500' padding='3' borderRadius='10px' spacing={useBreakpointValue({ base: "4", md: "5" })} {...rootProps}>
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
                <HStack spacing="5" width="100%">
                <Button variant='outline' colorScheme="green" isFullWidth onClick={() => props.onUnban(user.id)}>
                  Unban
                </Button>
                </HStack>
              </Stack>
            </Stack>
          );
    }

    return (
      <Stack borderWidth='1px' borderColor='gray.400' padding='3' borderRadius='10px' spacing={useBreakpointValue({ base: "4", md: "5" })} {...rootProps}>
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
          <HStack spacing="5" width="100%">
          <Button variant='outline' colorScheme="red" isFullWidth onClick={() => props.onBan(user.id)}>
            Ban
          </Button>
          </HStack>
        </Stack>
      </Stack>
    );
  };
  