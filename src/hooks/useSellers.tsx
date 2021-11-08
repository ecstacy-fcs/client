import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Seller } from "../types";

export const useSellers = () => {
  const {
    data: sellers,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data?: Seller[];
  }>("sellers", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    sellers: sellers?.data as Seller[],
    isLoading: (!sellers && !error) || isValidating,
    error,
    mutate,
  };
};
