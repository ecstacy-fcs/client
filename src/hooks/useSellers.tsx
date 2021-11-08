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
  }>("auth/user", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: sellers?.data as Seller[],
    isLoading: (!sellers && !error) || isValidating,
    error,
    mutate,
  };
};
