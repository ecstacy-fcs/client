import React, { useState } from "react";
import {
  Box,
  Text,
  useToast,
  Heading,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router"
import ErrorPage from 'next/error'
import { fetcher } from '../../lib/api'
import NextLink from "next/link";

interface paymentResponse {
    razorpay_payment_id: String;
    razorpay_payment_link_id : String;
    razorpay_payment_link_reference_id : String,
    razorpay_payment_link_status : String,
    razorpay_signature : String
}

interface correctQuery {
    queryparams: Boolean,
    status: Boolean
}

function showToast(status : Boolean)
{
    const toast = useToast()
    toast({
        position: "top",
        title: status ? "Success": "Error",
        description: status ? "Transaction completed successfully":"Could not process the request or transaction",
        status: status? "success": "error",
        duration: 9000,
        isClosable: true,
      })
}

export default (props : correctQuery) => {
    const router = useRouter()
    const { queryparams, status} = props

    if (queryparams === false)
    {
        return <ErrorPage statusCode={404} />
    }

    else
    {
        showToast(status)
        if(status===true)
        {
            return (
                <Box textAlign="center" mb={{ base: "10"}} mx="auto">
                    <Heading mt={10} mb={5}
                     color={useColorModeValue("gray.700", "gray.400")}>Thank you for shopping with us!
                    </Heading>

                    <Text mt="3" color={useColorModeValue("gray.600", "gray.400")} fontWeight="medium" fontSize="17">
                        Continue Shopping?{" "}
                        <NextLink passHref href="/">
                            <Link color="purple.600">Take me back to home</Link>
                        </NextLink>
                    </Text>
                </Box>
            )
        }

        else
        {
            return (
                <Box textAlign="center" mb={{ base: "10"}} mx="auto">
                    <Heading mt={10} mb={5}
                     color={useColorModeValue("gray.700", "gray.400")}> Looks like something went wrong.
                    </Heading>

                    <Text mt="3" color={useColorModeValue("gray.600", "gray.400")} fontWeight="medium" fontSize="17">
                    There was an error processing your payment.{" "}
                        <NextLink passHref href="/">
                            <Link color="purple.600">Take me back to home</Link>
                        </NextLink>
                    </Text>
                </Box>
            )
        }
    }
  }

  export async function getServerSideProps({query}: any) {
     query = query as paymentResponse
     let queryparams = false
     let status = false
     if (!query.razorpay_payment_id || !query.razorpay_payment_link_id || !query.razorpay_payment_link_reference_id || !query.razorpay_payment_link_status || !query.razorpay_payment_id)
     {
        queryparams= false
        status= false
     }
     else
     {
        let data
        let razorpay_payload = query.razorpay_payment_link_id + '|' + query.razorpay_payment_link_reference_id + '|' + query.razorpay_payment_link_status + '|' + query.razorpay_payment_id;
     try
     {
        data  = await fetcher("payment/validatepayment", "POST", {"razorpay_payload": razorpay_payload, "razorpay_signature": query.razorpay_signature, "order_id":query.razorpay_payment_link_reference_id})
        queryparams = true
        status = data.status
     }
     catch(exception)
     {
        queryparams= true
        status= false
      }
    }
    return {
        props: 
        {  
            queryparams: queryparams,
            status: status
        },
  }
}