import {
    AspectRatio,
    Box,
    Button,
    HStack,
    Image,
    Skeleton,
    Stack,
    StackProps,
    TagLabel,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from "@chakra-ui/react";
  import NextLink from "next/link";
  import * as React from "react";
  import { Product } from "../types";
  import { PriceTag } from "./PriceTag";
  
  interface Props {
    product: Product;
    onBan: () => void;
    onUnban: () => void;
    rootProps?: StackProps;
  }
  
  export const AdminProductCard = (props: Props) => {
    const { product, rootProps } = props;
    const { name, images, price } = product;
    return (
      <Stack
        spacing={useBreakpointValue({ base: "4", md: "5" })}
        {...rootProps}
        maxW="sm"
      >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={
                images.length > 0 ? images[0].path : "/product-placeholder.png"
              }
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
              <b>Sold by</b>: {product.seller.user.name}
            </Text>
            <HStack>
                <b>Price:</b>
                <PriceTag price={price} />
            </HStack>
          </Stack>
          <label
              color={useColorModeValue("gray.700", "gray.400")}
            >
              Category: {product.category.name}
            </label>
        </Stack>
        <Stack align="center">
          {!product.banned && <Button variant='outline' colorScheme='red' isFullWidth onClick={props.onBan}>
              Ban
            </Button>}
          {product.banned && <Button variant='outline' colorScheme='green' isFullWidth onClick={props.onUnban}>
              Unban
              </Button>}
        </Stack>
      </Stack>
    );
  };
  