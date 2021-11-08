import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Product } from "~/types/index"

export const useSearchResults = (query : string) => {
  const {
    data: products,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data?: Product[];
  }>(`search/${query}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    products: products?.data as Product[],
    isLoading: (!products && !error) || isValidating,
    error,
    mutate,
  };
};
