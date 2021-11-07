import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "~/lib/api";
import { UserWithoutPassword } from "../types";

export const useUser = (): {
  user: UserWithoutPassword;
  isLoading: boolean;
  error: string;
  mutate: KeyedMutator<{
    data?: UserWithoutPassword;
    error?: string | undefined;
  }>;
} => {
  const {
    data: user,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data?: UserWithoutPassword;
  }>("auth/user", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    user: user?.data as UserWithoutPassword,
    isLoading: (!user && !error) || isValidating,
    error,
    mutate,
  };
};
