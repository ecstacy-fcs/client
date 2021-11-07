interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

export const fetcher = async <T = any>(
  endpoint: string,
  method?: RequestMethod,
  body?: Record<string, any>
): Promise<{ data?: T | undefined; error?: string }> => {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (method !== "GET" && body) fetchOptions.body = JSON.stringify(body);

  try {
    const res = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
      fetchOptions
    );
    const data = (await res.json()) as ApiResponse<T>;
    if (!data.success) {
      console.error("An error occured", data.message);
      return { error: data.message };
    }
    return { data: data.data };
  } catch (err) {
    console.error(err);
    return {
      error: "An error occured while making the request. Please try again.",
    };
  }
};
