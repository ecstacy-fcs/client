import { Heading } from "@chakra-ui/layout";
import NextLink from "next/link";

export const Logo = () => {
  return (
    <NextLink href="/" passHref>
      <Heading
        as="h1"
        color="purple.500"
        fontWeight="800"
        cursor="pointer"
        size="lg"
      >
        Ecstacy
      </Heading>
    </NextLink>
  );
};

export default Logo;
