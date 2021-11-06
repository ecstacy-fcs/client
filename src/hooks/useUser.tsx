import useSWR from "swr";
import { fetcher } from "~/lib/api";

export const useUser = () => {
  const {
    data: user,
    error,
    mutate,
    isValidating,
  } = useSWR("auth/user", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: user?.data,
    isLoading: (!user && !error) || isValidating,
    error,
    mutate,
  };
};
