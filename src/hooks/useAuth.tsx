import { useToast } from "@chakra-ui/react";
import * as React from "react";
import { fetcher } from "~/lib/api";
import { useUser } from "./useUser";

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { user, mutate } = useUser();
  const toast = useToast();

  async function signUp(values: SignUpData) {
    if (user) return;

    const { data, error } = await fetcher("auth/register", "POST", {
      name: values.fullName,
      email: values.email,
      password: values.password,
    });

    toast({
      position: "top",
      title: error ? "An error occured" : "Success",
      description: error || "Account created",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
  }

  async function login(values: LoginData) {
    if (user) return;

    const { data, error } = await fetcher("auth/login", "POST", {
      email: values.email,
      password: values.password,
    });

    toast({
      position: "top",
      title: error ? "An error occured" : "Success",
      description: error || "Successfully logged in",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });

    mutate("user");
  }

  async function logout() {
    if (!user) return;

    const { data, error } = await fetcher("auth/logout");

    toast({
      position: "top",
      title: error ? "An error occured" : "Success",
      description: error || "Successfully logged out",
      status: error ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });

    mutate("user");
  }

  return {
    signUp,
    login,
    logout,
  };
};
