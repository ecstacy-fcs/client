import useSWR from "swr";
import { fetcher } from "~/lib/api";

export const useUser = () => {
  const {
    data: user,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data?: {
      id: string;
      name: string;
      email: string;
      verified: boolean;
    };
  }>("auth/user", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: user?.data,
    isLoading: (!user && !error) || isValidating,
    error,
    mutate,
  };
};
