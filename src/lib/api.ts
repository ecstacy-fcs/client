interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  csrfToken?: string;
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

let csrfToken = "";

export const fetcher = async <T = any>(
  endpoint: string,
  method?: RequestMethod,
  body?: Record<string, any>,
  isNotJSON?: boolean | undefined,
  requestOptions?: RequestInit,
): Promise<{ data?: T | undefined; error?: string }> => {
  
  // const toast = useToast();

  let headers = {}

  if(!isNotJSON)
  {
    headers={
      "Content-Type": "application/json",
      "csrf-token": csrfToken,
    }
  }
  else{
    headers={
      "csrf-token": csrfToken,
    }
  }

  const defaultOptions: RequestInit = {
    method,
    headers: headers,
    credentials: "include",
  };

  console.log(defaultOptions)

  if (method !== "GET" && body) defaultOptions.body = JSON.stringify(body);

  try {
    const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
      ...defaultOptions,
      ...requestOptions,
    });

    const data = (await res.json()) as ApiResponse<T>;

    if (data.csrfToken) csrfToken = data.csrfToken;

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
