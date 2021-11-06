import { fetcher } from "./api";

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

export async function signUp(values: SignUpData) {
  const { data, error } = await fetcher("auth/register", "POST", {
    name: values.fullName,
    email: values.email,
    password: values.password,
  });

  return {
    data,
    error,
  };
}

export async function login(values: LoginData) {
  const { data, error } = await fetcher("auth/login", "POST", {
    email: values.email,
    password: values.password,
  });

  return { data, error };
}

export async function logout() {
  const result = await fetcher("auth/logout");
}
