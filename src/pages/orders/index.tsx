import {
    Box,
    Heading,
    Link,
    Spinner,
    Stack,
    Table,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import React, { useEffect, useState } from "react";
import Page from "~/components/Page";
import { PriceTag } from "~/components/PriceTag";
  import Dashboard from "~/components/seller/Dashboard";
  import { useSeller } from "~/hooks/useSeller";
import { useUser } from "~/hooks/useUser";
  
  interface Props {}
  import { fetcher } from "~/lib/api";
import { Order } from "~/types";
  
  const BuyerOrders: React.FC = () => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>();
  
    const getOrders = async () => {
      if (!user) return;
      const { data } = await fetcher<Order[]>(
        `buy/orders`
      );
      console.log(data);
      setOrders(data);
    };

    useEffect(() => {
        if(!user && !isLoading) {
            router.push("/");
        }
    } , [isLoading, user]);
  
    useEffect(() => {
      if (user) getOrders();
    }, [user]);

  
    return (
        <Page>
        <Box overflowY='auto' padding='2'>
          <Heading size="lg" fontWeight="extrabold" mb="10">
            My Orders
          </Heading>
          <Stack direction="column">
            {!orders ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="purple.500"
                size="xl"
              />
            ) : (
              <Table variant="striped" size="sm">
                <Thead position="sticky" top="0" bg="white">
                  <Tr>
                    <Th>Order ID</Th>
                    <Th>Time</Th>
                    <Th>Product</Th>
                    <Th>Price</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map((order) => (
                    <Tr>
                      <Td lineHeight="tall">{order.id}</Td>
                      <Td lineHeight="tall">
                        {new Date(order.time).toLocaleString()}
                      </Td>
                      <Td lineHeight="tall">
                        <Link
                          href={`/products/${order.product.id}`}
                          color="Highlight"
                          size="5"
                        >
                          {order.product.name}
                        </Link>
                      </Td>
                      <Td lineHeight="tall"><PriceTag price={order.product.price}/></Td>
                      <Td lineHeight="tall"><Tag colorScheme={order.status?"green":"red"} size="sm">{order.status? "Order completed": "Order Failed"}</Tag></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Stack>
        </Box>
        </Page>
    );
  };
  
  export default BuyerOrders;