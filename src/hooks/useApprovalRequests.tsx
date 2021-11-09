import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Seller } from "../types";

export const useApprovalRequests = () => {
  const { data, error, mutate } = useSWR("sellers?approved=false", fetcher);

  return {
    unapprovedSellers: data?.data as Seller[],
    error,
    mutate,
    isLoading: !error && !data,
  };
};
