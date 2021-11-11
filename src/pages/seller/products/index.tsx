import { Heading, Spinner, Text, Badge } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ProductGrid } from "~/components/ProductGrid";
import Dashboard from "~/components/seller/Dashboard";
import { SellerProductCard } from "~/components/seller/SellerProductCard";
import { useSeller } from "~/hooks/useSeller";
import { fetcher } from "~/lib/api";
import { Product } from "~/types";

interface Props {}

const SellerProducts = ({}: Props) => {
  const [products, setProducts] = useState<Product[]>();
  const { seller } = useSeller();

  const getProducts = async () => {
    if (!seller) return;
    const { data } = await fetcher<Product[]>(`products/seller/${seller.id}`);
    setProducts(data);
  };

  useEffect(() => {
    if (seller) getProducts();
  }, [seller]);

  return (
    <Dashboard>
      <>
        <Heading size="lg" fontWeight="extrabold" mb="6">
          My Products
        </Heading>
        <ProductGrid>
          {!products ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          ) : products.length > 0 ? (
            products.map((product) => (
              <SellerProductCard key={product.id} product={product} />
            ))
          ) : (
            <Text as="i">No products.</Text>
          )}
        </ProductGrid>
      </>
    </Dashboard>
  );
};

export default SellerProducts;
