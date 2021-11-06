import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "~/lib/api";
import { User } from "../types";

export const useUser = (): {
  user: User;
  isLoading: boolean;
  error: string;
  mutate: KeyedMutator<{
    data?: unknown;
    error?: string | undefined;
  }>;
} => {
  const {
    data: user,
    error,
    mutate,
    isValidating,
  } = useSWR("auth/user", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: user?.data as User,
    isLoading: (!user && !error) || isValidating,
    error,
    mutate,
  };
};
