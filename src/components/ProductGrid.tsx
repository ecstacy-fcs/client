import React from "react";
import { Product } from "../types";
import { SimpleGrid, GridItem } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductGrid = (props: Props) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing="6">
      {props.products.map((product) => (
        <ProductCard {...product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
