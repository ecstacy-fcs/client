export const toastWrapper = (
  toast: any,
  error: string | undefined,
  title: string,
  successMessage?: string
) =>
  toast({
    position: "top",
    title: error ? "An error ocurred" : title,
    description: error || successMessage,
    status: error ? "error" : "success",
    duration: 3000,
    isClosable: true,
  });
