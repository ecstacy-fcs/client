import useSWR from "swr";
import { fetcher } from "~/lib/api";

export const useValidatePayment = (query : string) => {
  const {
    data: status,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data?: boolean
  }>(`payment/validate?${query}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    status: status?.data as boolean,
    isLoading: (!status && !error) || isValidating,
    error,
    mutate,
  };
};
