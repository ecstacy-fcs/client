import {
  Box,
  Heading,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import ErrorPage from "next/error";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, {useState, useEffect } from "react";
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

const Component = ()=>
{
    const router = useRouter();
    const [ status, setStatus ] = useState(false)
    let queryParams = false
    const razorpay_payment_id = router.query.razorpay_payment_id
    const razorpay_payment_link_id = router.query.razorpay_payment_link_id
    const razorpay_payment_link_reference_id = router.query.razorpay_payment_link_reference_id
    const razorpay_payment_link_status = router.query.razorpay_payment_link_status
    const razorpay_signature = router.query.razorpay_signature
    let payload : string = ""
    if(razorpay_payment_id && razorpay_payment_link_id && razorpay_payment_link_reference_id && razorpay_payment_link_status && razorpay_signature)
    {
        queryParams = true
        payload = razorpay_payment_link_id + '|' + razorpay_payment_link_reference_id + '|' + razorpay_payment_link_status + '|' + razorpay_payment_id;
    }

    useEffect(()=>
    {
        if(!router.isReady) 
        {
            return
        }
        const validatePayment= async ()=>
        {
            console.log(payload, razorpay_signature,razorpay_payment_link_reference_id )
            const res = await fetcher("payment/validate", "POST", {  
                razorpay_payload: payload,
                razorpay_signature: razorpay_signature,  
                orderId: razorpay_payment_link_reference_id
            })
            console.log(res.data)
            return(res.data.status)
        }
        if(payload!=""){
            console.log("where", queryParams)
            validatePayment().then((res)=>{setStatus(res)}) 
        }       
    },[router.isReady]);

    return queryParams? 
    (status?
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
                 Continue Shopping?{" "}
                 <NextLink passHref href="/">
                   <Link color="purple.600">Take me back to home</Link>
                 </NextLink>
               </Text>
             </Box>
    :    <Box textAlign="center" mb={{ base: "10" }} mx="auto">
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
        There was an error in processing your payment.{" "}
        <NextLink passHref href="/">
          <Link color="purple.600">Go back to home?</Link>
        </NextLink>
      </Text>
    </Box>
  )
    : (<ErrorPage statusCode={404} />)
}
export default Component