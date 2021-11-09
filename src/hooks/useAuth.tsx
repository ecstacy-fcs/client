import { useToast } from "@chakra-ui/react";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { LoginData, SignUpData } from "../types";
import { useUser } from "./useUser";

export const useAuth = () => {
  const { user, mutate } = useUser();
  const toast = useToast();

  async function signUp(values: SignUpData): Promise<boolean> {
    if (user) return false;
    const { data, error } = await fetcher("auth/register", "POST", {
      name: values.fullName,
      email: values.email,
      password: values.password,
    });
    toastWrapper(
      toast,
      error,
      "Success",
      "Account created, you may now log in"
    );
    return !error;
  }

  async function login(values: LoginData): Promise<boolean> {
    if (user) return false;
    const { data, error } = await fetcher("auth/login", "POST", {
      email: values.email,
      password: values.password,
    });
    toastWrapper(toast, error, "Success", "Successfully logged in");
    mutate();
    return !error;
  }

  async function logout() {
    if (!user) return;
    const { data, error } = await fetcher("auth/logout");
    toastWrapper(toast, error, "Success", "Successfully logged out");
    mutate();
  }

  return {
    signUp,
    login,
    logout,
  };
};
