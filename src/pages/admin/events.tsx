import {
  Code,
  Flex,
  Heading,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useSWR from "swr";
import Dashboard from "~/components/admin/Dashboard";
import { fetcher } from "~/lib/api";
import { User } from "~/types";

interface Event {
  id: string;
  time: Date;
  ipAddress: string;
  actorId: string;
  actor: User;
  type: "CREATE" | "READ" | "UPDATE" | "DELETE";
  description?: string;
}

const Events: React.FC = () => {
  const { data: events, error } = useSWR<{
    data?: Event[];
    error?: string;
  }>("events", fetcher);

  const tagColor = {
    CREATE: "green",
    READ: "yellow",
    UPDATE: "blue",
    DELETE: "red",
  };

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
          Events
        </Heading>
        {!events ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        ) : error || events.error ? (
          <Text>An error occured, please try again</Text>
        ) : (
          <Table variant="striped" size="sm">
            <Thead position="sticky" top="0" bg="white">
              <Tr>
                <Th>Date</Th>
                <Th>IP Address</Th>
                <Th>Actor</Th>
                <Th>Action</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.data!.map((event) => (
                <Tr>
                  <Td lineHeight="tall">
                    {new Date(event.time).toLocaleString()}
                  </Td>
                  <Td lineHeight="tall">
                    <Code>{event.ipAddress}</Code>
                  </Td>
                  <Td lineHeight="tall">{event.actor.name}</Td>
                  <Td lineHeight="tall">
                    <Tag colorScheme={tagColor[event.type]} size="sm">
                      {event.type}
                    </Tag>
                  </Td>
                  <Td>
                    <Text lineHeight="tall">{event.description}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Dashboard>
  );
};

export default Events;
