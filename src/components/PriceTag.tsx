import { HStack, StackProps, Text, TextProps } from "@chakra-ui/react";
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
  return (
    <Text
      as="span"
      fontWeight="medium"
      color="gray.700"
      textDecoration={"none"}
      {...textProps}
    >
      {children}
    </Text>
  );
};
