import useSWR from "swr";
import { fetcher } from "~/lib/api";
import { Seller } from "../types";

export const useApprovalRequests = () => {
  const { data: approvalRequests, error, mutate } = useSWR("sellers?approved=false", fetcher);
  
  return {
    approvalRequests: approvalRequests?.data,
    error,
    mutate,
    isLoading: !error && !approvalRequests,
  };
};