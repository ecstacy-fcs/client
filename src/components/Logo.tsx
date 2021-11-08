import { Heading } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Logo = () => {
  const router = useRouter();
  return (
    <Tooltip
      hasArrow
      label="We know it's a typo!"
      bg="gray.100"
      color="gray.500"
    >
      <Heading
        as="h1"
        color="purple.500"
        fontWeight="800"
        cursor="pointer"
        size="lg"
        onClick={() => router.push("/")}
      >
        Ecstacy
      </Heading>
    </Tooltip>
  );
};

export default Logo;
