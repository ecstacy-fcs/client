import {
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
import Dashboard from "~/components/seller/Dashboard";
import { useSeller } from "~/hooks/useSeller";

interface Props {}
import { fetcher } from "~/lib/api";
import { SellerOrder } from "~/types";

const SellerOrders: React.FC = () => {
  const { seller, isLoading } = useSeller();
  const router = useRouter();
  const [orders, setOrders] = useState<SellerOrder[]>();

  const getOrders = async () => {
    if (!seller) return;
    const { data } = await fetcher<SellerOrder[]>(
      `sellers/${seller.id}/orders`
    );
    console.log(data);
    setOrders(data);
  };

  useEffect(() => {
    if (seller) getOrders();
  }, [seller]);

  return (
    <Dashboard>
      <>
        <Heading size="lg" fontWeight="extrabold" mb="6">
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
                    <Td lineHeight="tall">{order.product.price}</Td>
                    <Td lineHeight="tall">{order.buyer.user.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Stack>
      </>
    </Dashboard>
  );
};

export default SellerOrders;
