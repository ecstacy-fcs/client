import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Skeleton,
  StackProps,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiShare } from "react-icons/hi";
import Page from "~/components/Page";
import { useUser } from "~/hooks/useUser";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { PriceTag } from "../../components/PriceTag";
import { Product } from "../../types";
import NextLink from "next/link";

interface ProductProps {
  product: Product;
  rootProps?: StackProps;
  error: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data, error } = await fetcher(`products/${ctx.params?.productId}`);

  return {
    props: {
      product: (data as Product) || null,
      error: error || null,
    },
  };
};

const ProductPage: React.FC<ProductProps> = ({ product, error }) => {
  const toast = useToast();
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (error) {
    return (
      <Page>
        <Box textAlign="center" mb={{ base: "10" }} mx="auto">
          <Heading
            mt={10}
            mb={5}
            color={useColorModeValue("grey.700", "grey.400")}
          >
            {error}
          </Heading>
          <NextLink passHref href="/">
            <Link fontSize="20" color="purple.600">
              Go back to home?
            </Link>
          </NextLink>
        </Box>
      </Page>
    );
  }

  const { name, images, price, description, seller, category } = product;
  const arrowStyles = {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState("");

  const handleOnClick = () => {
    let id = router.query.productId;
    setPaymentUrl("loading");
    const buyProduct = async function as() {
      const res = await fetcher("payment/pay", "POST", {
        pid: id,
      });
      return res;
    };
    buyProduct().then((res) => {
      console.log(res.data);
      if(!res.error)
      {
        window.location.assign(res.data);
        setPaymentUrl(res.data);
      }else{
        toastWrapper(toast, res.error, "Error", res.error);
        setPaymentUrl("");
      }
    });
  };

  const slidesCount = images.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  return (
    <Page>
      <SimpleGrid columns={2} spacing={30} minChildWidth="370px">
        <Box boxSize="sm" flexShrink={0}>
          <Flex alignItems="center" justifyContent="center">
            <Flex w="full" overflow="hidden" pos="relative">
              {images.length > 0 ? (
                <>
                  <Flex w="full" {...carouselStyle}>
                    {images.map((image, sid) => (
                      <Box
                        key={`slide-${sid}`}
                        boxSize="full"
                        shadow="md"
                        flex="none"
                      >
                        <AspectRatio ratio={4 / 3}>
                          <Image
                            src={image.path}
                            boxSize="full"
                            fallback={<Skeleton />}
                            draggable="false"
                            alt={name}
                            borderRadius="10"
                          />
                        </AspectRatio>
                      </Box>
                    ))}
                  </Flex>
                  <Text {...(arrowStyles as any)} left="0" onClick={prevSlide}>
                    &#10094;
                  </Text>
                  <Text {...(arrowStyles as any)} right="0" onClick={nextSlide}>
                    &#10095;
                  </Text>
                </>
              ) : (
                <Box boxSize="full" shadow="md" flex="none">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src="/product-placeholder.png"
                      boxSize="full"
                      fallback={<Skeleton />}
                      draggable="false"
                      alt={name}
                      borderRadius="10"
                    />
                  </AspectRatio>
                </Box>
              )}
            </Flex>
          </Flex>
        </Box>
        <Box display="flex" flexDirection="column">
          <HStack spacing={10}>
            <HStack>
              <Text
                fontWeight="bold"
                fontSize="25"
                color={useColorModeValue("gray.700", "gray.400")}
              >
                {name}
              </Text>
              <Badge ml="1" colorScheme="purple" flexShrink={0}>
                {category.name}
              </Badge>
            </HStack>
            <IconButton
              variant="ghost"
              colorScheme="purple"
              aria-label="Paste OTP"
              icon={<HiShare size="24" />}
              size="lg"
              onClick={async () => {
                await window.navigator.clipboard.writeText(
                  window.location.href
                );
                toastWrapper(
                  toast,
                  undefined,
                  "Link copied!",
                  "Happy sharing :)"
                );
              }}
            />
          </HStack>
          <PriceTag price={price} />
          <Divider orientation="horizontal" p="2" />
          <Text
            fontWeight="semibold"
            pt="4"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            Product Description:
          </Text>
          <Text color={useColorModeValue("gray.700", "gray.700")}>
            {description}
          </Text>
          <Text
            fontWeight="semibold"
            pt="3"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            Sold by:
          </Text>
          <Text color={useColorModeValue("gray.700", "gray.700")} mb="4">
            {seller.user.name}
          </Text>
          <Button
            colorScheme="purple"
            size="md"
            p="3"
            maxWidth="100"
            onClick={() => {
              if (!user && !isLoading) {
                toastWrapper(
                  toast,
                  "You must login before placing an order.",
                  "Login required!"
                );
                router.push("/auth/login");
              } else if (!user?.address || !user?.phoneNumber) {
                toastWrapper(
                  toast,
                  "Please complete your profile before placing an order",
                  "Profile Incomplete!"
                );
                router.push("/profile");
              } else {
                handleOnClick();
              }
            }}
            isLoading={paymentUrl === "loading"}
          >
            Buy Now
          </Button>
        </Box>
      </SimpleGrid>
    </Page>
  );
};

export default ProductPage;
