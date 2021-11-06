import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  StackProps,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Divider, Badge, SimpleGrid } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { Product } from '../../types'
import ErrorPage from 'next/error'
import { fetcher } from '../../lib/api'

interface paymentResponse {
    razorpay_payment_id: String;
    razorpay_payment_link_id : String;
    razorpay_payment_link_reference_id : String,
    razorpay_payment_link_status : String,
    razorpay_signature : String
}

interface correctQuery {
    queryparams: Boolean,
    status?: Boolean
}

export default (props : correctQuery) => {
    const router = useRouter()
    const { queryparams, status } = props
    if (queryparams === false)
    {
        return <ErrorPage statusCode={404} />
    }
    else
    {
        if(status===true)
        {
            return <h1>Payment Successful</h1>
        }

        else
        {
            return <h1>Payment failed like your mom</h1>
        }
    }
  }

  export async function getServerSideProps({query}: any) {
     query = query as paymentResponse
     if (!query.razorpay_payment_id || !query.razorpay_payment_link_id || !query.razorpay_payment_link_reference_id || !query.razorpay_payment_link_status || !query.razorpay_payment_id)
     {
         return{
             props:
             {
                 queryparams: false,
                 status: false
             }
         }
     }
     let razorpay_payload = query.razorpay_payment_link_id + '|' + query.razorpay_payment_link_reference_id + '|' + query.razorpay_payment_link_status + '|' + query.razorpay_payment_id;
     const data  = await fetcher("payment/validatepayment", "POST", {"razorpay_payload": razorpay_payload, "razorpay_signature": query.razorpay_signature, "order_id":query.razorpay_payment_link_reference_id})
     return {
        props: 
        {  
            queryparams: true,
            status: data.status
        },
      }
  }