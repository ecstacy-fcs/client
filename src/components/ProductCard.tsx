import {
  AspectRatio,
  Box,
  Button,
  Image,
  Skeleton,
  Stack,
  StackProps,
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
  rootProps?: StackProps;
}

export const ProductCard = (props: Props) => {
  const { product, rootProps } = props;
  const { title, images, price } = product; 
  let path: string;
  try{
    path = images[0].path
  }
  catch(exception){
    path="https://via.placeholder.com/150/4A5568.png?text=No+Image"
  }
  return (
    <Stack spacing={useBreakpointValue({ base: "4", md: "5" })} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={path}
            alt={title}
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
            {title}
          </Text>
          <PriceTag price={price} />
        </Stack>
      </Stack>
      <Stack align="center">
        <NextLink href={`/products/${product.id}`}>
          <Button colorScheme="purple" isFullWidth>
            View Product
          </Button>
        </NextLink>
      </Stack>
    </Stack>
  );
};
