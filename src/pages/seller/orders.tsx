import {
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Dashboard from "~/components/seller/Dashboard";
import { useSeller } from "~/hooks/useSeller";
import { fetcher } from "~/lib/api";
import { SellerOrder } from "~/types";

const SellerOrders: React.FC = () => {
  const { seller } = useSeller();
  const [orders, setOrders] = useState<SellerOrder[]>();

  const getOrders = async () => {
    if (!seller) return;
    const { data } = await fetcher<SellerOrder[]>(
      `sellers/${seller.id}/orders`
    );
    setOrders(data);
  };

  useEffect(() => {
    if (seller) getOrders();
  }, [seller]);

  return (
    <Dashboard>
      <Flex
        direction="column"
        flex="1"
        overflow="auto"
        px="10"
        pt={{ md: 1, base: 1 }}
        maxWidth="100vw"
      >
        <Heading size="lg" fontWeight="extrabold" mb="6">
          My Orders
        </Heading>
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
                <Th>Buyer</Th>
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
                      color="gray.900"
                    >
                      {order.product.name}
                    </Link>
                  </Td>
                  <Td lineHeight="tall">₹{order.product.price}</Td>
                  <Td lineHeight="tall">{order.buyer.user.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Dashboard>
  );
};

export default SellerOrders;
