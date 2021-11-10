export const toastWrapper = (
  toast: any,
  error: string | undefined,
  title: string,
  message?: string,
  info?: boolean | undefined
) =>
  toast({
    position: info ? "bottom-left" : "top",
    title: error ? "An error ocurred" : title,
    description: error || message,
    status: error ? "error" : info ? "info" : "success",
    variant: info ? "left-accent" : "solid",
    duration: info ? null : 3000,
    isClosable: true,
  });
