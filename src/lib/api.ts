interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;
console.log(NEXT_PUBLIC_API_BASE_URL);

export const fetcher = async <T = any>(
  endpoint: string,
  method?: RequestMethod,
  body?: Record<string, any>
): Promise<T | undefined> => {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(NEXT_PUBLIC_API_BASE_URL);

  if (method !== "GET" && body) fetchOptions.body = JSON.stringify(body);

  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
      fetchOptions
    );

    const data = (await res.json()) as ApiResponse<T>;

    if (!data.success) {
      console.error("An error occured", data.message);
      // error toast
      return undefined;
    }

    return data.data;
  } catch (err) {
    console.error(err);
    // an error occured
  }

  return;
};
