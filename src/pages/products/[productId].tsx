import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  StackProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PriceTag } from "../../components/PriceTag";
import { Product } from "../../types";

interface ProductProps {
  product: Product;
  rootProps?: StackProps;
}

const ProductPage: React.FC<ProductProps> = ({ product }) => {
  const { title, images, price, description, seller, category } = product;
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
    <SimpleGrid columns={2} spacing={30} minChildWidth="370px">
      <Box boxSize="sm" flexShrink={0}>
        <Flex alignItems="center" justifyContent="center">
          <Flex w="full" overflow="hidden" pos="relative">
            <Flex w="full" {...carouselStyle}>
              {images.map((slide, sid) => (
                <Box
                  key={`slide-${sid}`}
                  boxSize="full"
                  shadow="md"
                  flex="none"
                >
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={slide}
                      boxSize="full"
                      fallback={<Skeleton />}
                      draggable="false"
                      alt={title}
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
          </Flex>
        </Flex>
      </Box>
      <Box display="flex" flexDirection="column">
        <HStack>
          <Text
            fontWeight="bold"
            fontSize="25"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            {title}
          </Text>
          <Badge ml="1" colorScheme="purple" flexShrink={0}>
            {category}
          </Badge>
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
          {seller}
        </Text>
        <Button colorScheme="purple" size="md" p="3" maxWidth="100">
          Buy Now
        </Button>
      </Box>
    </SimpleGrid>
  );
};

export default ProductPage;

export function getServerSideProps() {
  return {
    props: {
      product: {
        id: "1234",
        images: [
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=680&q=80",
        ],
        price: 23500,
        seller: "Ananya",
        title: "Premium Watch",
        category: "Fashion",
        description: "Does what normal watches do, at 10 times the price. ",
      },
    },
  };
}
