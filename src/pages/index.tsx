import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Page from "~/components/Page";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import { Product } from "../types";
import { GetServerSideProps } from "next";
import { fetcher } from "~/lib/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data, error } = await fetcher("products"); // your fetch function here

  return {
    props: {
      products: (data as Product[]) ?? null,
      error: error ?? null,
    },
  };
};

const Home = (props: { products: Product[]; error: string }) => {
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
          {props.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </Box>
    </Page>
  );
};

export default Home;
