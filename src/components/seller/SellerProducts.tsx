import { Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSeller } from "~/hooks/useSeller";
import { fetcher } from "~/lib/api";
import { SellerProductCard } from "./SellerProductCard";
import { ProductGrid } from "../ProductGrid";
import { SellerDashboardTab } from "~/types";

interface Props {}

const SellerProducts = ({}: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  const { seller } = useSeller();

  useEffect(() => {
    fetcher(`products/seller/${seller.id}`).then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <Heading size="lg" fontWeight="extrabold" mb="6">
        All Products
      </Heading>
      <ProductGrid>
        {products.length > 0 ? (
          products.map((product) => (
            <SellerProductCard key={product.id} product={product} />
          ))
        ) : (
          <Text as="i">No products.</Text>
        )}
      </ProductGrid>
    </>
  );
};

export default SellerProducts;
