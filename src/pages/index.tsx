import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import Header from "~/components/Header";

import { Product } from "../types";
import ProductGrid from "~/components/ProductGrid";

const Home: NextPage = () => {
  const products: Product[] = [
    {
      id: "1234",
      images: ["/vercel.svg"],
      price: 235,
      seller: "Ananya",
      title: "Box of Chocolates",
    },
    {
      id: "1234",
      images: ["/vercel.svg"],
      price: 235,
      seller: "Ananya",
      title: "Box of Chocolates",
    },
    {
      id: "1234",
      images: ["/vercel.svg"],
      price: 235,
      seller: "Ananya",
      title: "Box of Chocolates",
    },
  ];

  return (
    <Box mx="auto">
      <Heading as="h1" color="gray.800" fontWeight="800" size="xl">
        Marketplace
      </Heading>

      <ProductGrid products={products} />
    </Box>
  );
};

export default Home;
