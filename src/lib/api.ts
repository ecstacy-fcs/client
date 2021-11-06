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
): Promise<{ data?: T | undefined; error?: string }> => {
  // const toast = useToast();

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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

      return { error: data.message };
    }

    return { data: data.data };
  } catch (err) {
    console.error(err);
    // toast({
    //   position: "top",
    //   title: "An error occured",
    //   description:
    //     "An error occured while making the request. Please try again.",
    //   status: "error",
    //   duration: 3000,
    //   isClosable: true,
    // });
    return {
      error: "An error occured while making the request. Please try again.",
    };
  }
};
