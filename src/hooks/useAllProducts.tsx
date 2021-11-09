import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Product } from "../types";

export const useAllProducts = () => {
  const {
    data: unbannedProducts,
    error: unbannedError,
    mutate: unbannedMutate,
  } = useSWR("products", fetcher);
  const {
    data: bannedProducts,
    error: bannedProductsError,
    mutate: bannedProductsMutate,
  } = useSWR("products/banned", fetcher);

  const error = unbannedError || bannedProductsError;

  const mutate = () => {
    unbannedMutate();
    bannedProductsMutate();
  };

  let products: Product[] = [];
  if (unbannedProducts) {
    products = [...(unbannedProducts.data as Product[])];
  }

  if (bannedProducts) {
    products = [...products, ...(bannedProducts.data as Product[])];
  }

  return {
    products,
    error,
    mutate,
    isLoading: !error && !unbannedProducts && !bannedProducts,
  };
};
