import ErrorPage from "next/error";
import React from "react";
import { useValidatePayment } from "~/hooks/useValidatePayment";
import { useRouter } from "next/router";
import { Box, Heading, Spinner, Text, useColorModeValue, Link } from "@chakra-ui/react";
import Page from "~/components/Page";
import { ProductCard } from "~/components/ProductCard";
import { ProductGrid } from "~/components/ProductGrid";
import NextLink from "next/link";

export default function Component()
{
  const router = useRouter()
    const razorpay_payment_id = router.query.razorpay_payment_id
    const razorpay_payment_link_id = router.query.razorpay_payment_link_id
    const razorpay_payment_link_reference_id = router.query.razorpay_payment_link_reference_id
    const razorpay_payment_link_status = router.query.razorpay_payment_link_status
    const razorpay_signature = router.query.razorpay_signature
    let payload : string = ""
    payload = razorpay_payment_link_id + '|' + razorpay_payment_link_reference_id + '|' + razorpay_payment_link_status + '|' + razorpay_payment_id;

    const req = `payload=${payload}&signature=${razorpay_signature}&orderId=${razorpay_payment_link_reference_id}`

    const { status, error, isLoading } = useValidatePayment(req)

    return isLoading?(
      <Page>
          <Box display="flex" justifyContent="center" alignContent="center">
              <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.600"
              size="xl"
          />
      </Box>
    </Page>)
    :(error || !status)? (
       <Page>
         <Box textAlign="center" mb={{ base: "10" }} mx="auto">
         <Heading mt={10} mb={5} color={useColorModeValue("gray.700", "gray.400")}>
          {" "}
          Looks like something went wrong.
        </Heading>
        <Text
        mt="3"
        color={useColorModeValue("gray.600", "gray.400")}
        fontWeight="medium"
        fontSize="17"
         >
        <NextLink passHref href="/">
          <Link color="purple.600">Go back to home?</Link>
        </NextLink>
          </Text>
        </Box>
      </Page>
    )
    :(
      <Page>
        <Box textAlign="center" mb={{ base: "10" }} mx="auto">
               <Heading mt={10} mb={5} color={useColorModeValue("gray.700", "gray.400")}>
                 Thank you for shopping with us!
               </Heading>
        
               <Text
                 mt="3"
                 color={useColorModeValue("gray.600", "gray.400")}
                 fontWeight="medium"
                 fontSize="17"
               >
                 Your payment was processed successfully.{" "}
                 <NextLink passHref href="/">
                   <Link color="purple.600">Go back to home?</Link>
                 </NextLink>
               </Text>
             </Box>
             </Page>
    )
}