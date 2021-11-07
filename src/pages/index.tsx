import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Page from "~/components/Page";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import { Product } from "../types";

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
      category: "Fashion",
      description: "Does what normal watches do, at 10 times the price",
    },
    {
      id: "1234",
      images: [
        "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
      category: "Fashion",
      description: "Does what normal watches do, at 10 times the price",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
      category: "Fashion",
      description: "Does what normal watches do, at 10 times the price",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
      category: "Fashion",
      description: "Does what normal watches do, at 10 times the price",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
      category: "Fashion",
      description: "Does what normal watches do, at 10 times the price",
    },
    {
      id: "1234",
      images: [
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
      ],
      price: 23500,
      seller: "Ananya",
      title: "Premium Watch",
      category: "Fashion",
      description: "Does what normal watches do, at 10 times the price",
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
