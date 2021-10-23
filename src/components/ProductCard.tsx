import React from "react";
import { Product } from "../types";
import { Stack, Image, Heading } from "@chakra-ui/react";

const ProductCard = (props: Product) => {
  return (
    <Stack as="article" direction="column" padding={8}>
      <Image src={props.images[0]} bg="white" />
      <Heading size="sm">{props.title}</Heading>
    </Stack>
  );
};

export default ProductCard;
