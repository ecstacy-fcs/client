import { Box, Heading, Link, Text, useToast } from "@chakra-ui/react";
import ErrorPage from "next/error";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../lib/api";

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_payment_link_id: string;
  razorpay_payment_link_reference_id: string;
  razorpay_payment_link_status: string;
  razorpay_signature: string;
}

interface CorrectQuery {
  queryParams: boolean;
  status: boolean;
}

function showToast(status: boolean) {
  const toast = useToast();
  toast({
    position: "top",
    title: status ? "Success" : "Error",
    description: status
      ? "Transaction completed successfully"
      : "Could not process the request or transaction",
    status: status ? "success" : "error",
    duration: 9000,
    isClosable: true,
  });
}

export default ({ queryParams, status }: CorrectQuery) => {
  const router = useRouter();
  if (!queryParams) return <ErrorPage statusCode={404} />;

  showToast(status);
  return status ? (
    <Box textAlign="center" mb={{ base: "10" }} mx="auto">
      <Heading mt={10} mb={5} color="gray.700">
        Thank you for shopping with us!
      </Heading>

      <Text mt="3" color="gray.600" fontWeight="medium" fontSize="17">
        Continue Shopping?{" "}
        <NextLink passHref href="/">
          <Link color="purple.600">Take me back to home</Link>
        </NextLink>
      </Text>
    </Box>
  ) : (
    <Box textAlign="center" mb={{ base: "10" }} mx="auto">
      <Heading mt={10} mb={5} color="gray.700">
        {" "}
        Looks like something went wrong.
      </Heading>

      <Text mt="3" color="gray.600" fontWeight="medium" fontSize="17">
        There was an error processing your payment.{" "}
        <NextLink passHref href="/">
          <Link color="purple.600">Take me back to home</Link>
        </NextLink>
      </Text>
    </Box>
  );
};

export async function getServerSideProps({
  query,
}: {
  query: PaymentResponse;
}) {
  const {
    razorpay_payment_id,
    razorpay_payment_link_id,
    razorpay_payment_link_reference_id,
    razorpay_payment_link_status,
    razorpay_signature,
  } = query;
  const payload = [
    razorpay_payment_id,
    razorpay_payment_link_id,
    razorpay_payment_link_reference_id,
    razorpay_payment_link_status,
  ];
  if ([...payload, razorpay_signature].map(Boolean).some((param) => !param)) {
    return {
      props: {
        queryParams: false,
        status: false,
      },
    };
  }
  try {
    const { data, error } = await fetcher<{ status: boolean }>(
      "payment/validate",
      "POST",
      {
        payload: payload.join("|"),
        signature: query.razorpay_signature,
        orderId: query.razorpay_payment_link_reference_id,
      }
    );
    return {
      props: {
        queryParams: true,
        status: Boolean(!error && data?.status),
      },
    };
  } catch (exception) {
    return {
      props: {
        queryParams: true,
        status: false,
      },
    };
  }
}
