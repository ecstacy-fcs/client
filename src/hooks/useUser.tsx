import { useEffect } from "react";
import useSWR, { KeyedMutator } from "swr";
import { UserWithoutPassword } from "../types";

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export const useUser = (): {
  user: UserWithoutPassword;
  isLoading: boolean;
  error: string;
  isValidating: boolean;
  mutate: KeyedMutator<{
    data?: UserWithoutPassword;
    error?: string | undefined;
  }>;
} => {
  const { data: user, error, mutate, isValidating } = useSWR("user", fetcher);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return {
    user,
    isLoading: !user && !error,
    isValidating,
    error,
    mutate,
  };
};
