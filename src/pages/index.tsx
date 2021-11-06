import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import { Product } from "../types";
import { ProductGrid } from "~/components/ProductGrid";
import { ProductCard } from "~/components/ProductCard";
import Page from "~/components/Page";

const Home: NextPage = (props) => {
  const products: Product[] = [
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
    },
  ];

  return (
    <Page>
      <Box mx="auto">
        <Heading
          as="h1"
          color="gray.800"
          fontWeight="extrabold"
          letterSpacing="tight"
          size="xl"
        >
          Marketplace
        </Heading>
        <ProductGrid marginTop="10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </Box>
    </Page>
  );
};

export default Home;
