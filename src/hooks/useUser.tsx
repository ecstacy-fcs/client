import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "~/lib/api";

export const useUser = () => {
  const { data: user, error } = useSWR("user", fetcher);
  const { mutate } = useSWRConfig();

  return {
    user,
    isLoading: !user && !error,
    error,
    mutate,
  };
};
