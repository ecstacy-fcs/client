import { useRouter } from "next/router";
import { useSearchResults } from "~/hooks/useSearchResults";
import { Box, Heading, Spinner, Text, useColorModeValue, Link } from "@chakra-ui/react";
import Page from "~/components/Page";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import NextLink from "next/link";

export default function Comp()
{
    const router = useRouter()
    const query = router.query
    console.log(query.query)

    const { products, error, isLoading } = useSearchResults(`${query.query}`)
    console.log(error)

    return isLoading?(
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
      </Page>)
    :error || !products.length?(
        <Box textAlign="center" mb={{ base: "10" }} mx="auto">
            <Heading mt={10} mb={5} color={useColorModeValue("white", "white")}>
            {" "}
            Could not find what you were looking for.
            </Heading>
            <NextLink passHref href="/">
                <Link fontSize="20" color="purple.200">Go back to home?</Link>
            </NextLink>
        </Box>
    ):(
        <Page>
            <Box mx="auto">
            <Heading
          as="h1"
          color="white"
          fontWeight="extrabold"
          letterSpacing="tight"
          size="lg">  {`Search Results for "${query.query}"`}
            </Heading>
            <ProductGrid marginTop="10">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ProductGrid>
        </Box>
        </Page>
    )
}