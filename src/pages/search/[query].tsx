import {
  Box,
  Heading,
  Link,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Page from "~/components/Page";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import { fetcher } from "~/lib/api";
import { Product } from "~/types";

export default function Comp() {
  const router = useRouter();
  const query = router.query;

  const { data, error, isValidating } = useSWR<{
    data?: Product[];
  }>(`search/${query.query}`, fetcher, {
    revalidateOnFocus: false,
  });

  const products: Product[] | undefined = data?.data;
  const isLoading = (!data && !error) || isValidating;

  return isLoading ? (
    <Page>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.600"
          size="xl"
        />
      </Box>
    </Page>
  ) : error || !products?.length ? (
    <Page>
      <Box textAlign="center" mb={{ base: "10" }} mx="auto">
        <Heading
          mt={10}
          mb={5}
          color={useColorModeValue("grey.700", "grey.400")}
        >
          {" "}
          Could not find what you were looking for.
        </Heading>
        <NextLink passHref href="/">
          <Link fontSize="20" color="purple.600">
            Go back to home?
          </Link>
        </NextLink>
      </Box>
    </Page>
  ) : (
    <Page>
      <Box mx="auto">
        <Heading
          as="h1"
          color="gray.800"
          fontWeight="extrabold"
          letterSpacing="tight"
          size="lg"
        >
          {" "}
          {`Search Results for '${query.query}'`}
        </Heading>
        <ProductGrid marginTop="10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </Box>
    </Page>
  );
}
