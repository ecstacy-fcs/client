import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "~/lib/api";
import { Seller } from "../types";

export const useSeller = (): {
  seller: Seller;
  isLoading: boolean;
  error: string;
  mutate: KeyedMutator<{
    data?: unknown;
    error?: string | undefined;
  }>;
} => {
  const {
    data: seller,
    error,
    mutate,
    isValidating,
  } = useSWR("sell", fetcher, {
    revalidateOnFocus: false,
  });
  return {
    seller: seller?.data as Seller,
    isLoading: (!seller && !error) || isValidating,
    error,
    mutate,
  };
};
