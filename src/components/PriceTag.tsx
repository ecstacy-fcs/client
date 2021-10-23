import {
  HStack,
  Text,
  TextProps,
  StackProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

interface PriceTagProps {
  price: number;
  rootProps?: StackProps;
  priceProps?: TextProps;
}

export function formatPrice(value: number) {
  const locale = "en-IN";
  const formatter = new Intl.NumberFormat(locale, {
    currency: "INR",
    style: "currency",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export const PriceTag = (props: PriceTagProps) => {
  const { price, rootProps, priceProps } = props;
  return (
    <HStack spacing="1" {...rootProps}>
      <Price textProps={priceProps}>{formatPrice(price)}</Price>
    </HStack>
  );
};

interface PriceProps {
  children?: React.ReactNode;
  textProps?: TextProps;
}

const Price = (props: PriceProps) => {
  const { children, textProps } = props;
  const color = mode("gray.700", "gray.400");
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
      textDecoration={"none"}
      {...textProps}
    >
      {children}
    </Text>
  );
};
