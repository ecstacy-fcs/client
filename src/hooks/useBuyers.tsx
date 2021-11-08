import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Buyer, Seller } from "../types";

export const useBuyers = () => {
  const {
    data: buyers,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data?: Buyer[];
  }>("buyers", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    buyers: buyers?.data as Buyer[],
    isLoading: (!buyers && !error) || isValidating,
    error,
    mutate,
  };
};
