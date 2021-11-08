import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSeller } from "~/hooks/useSeller";
import { fetcher } from "~/lib/api";
import { ProductCard } from "../ProductCard";
import { ProductGrid } from "../ProductGrid";

interface Props {}

const SellerProducts = (props: Props) => {
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </>
  );
};

export default SellerProducts;
