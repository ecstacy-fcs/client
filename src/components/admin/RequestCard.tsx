import {
  Avatar,
  Box,
  Button,
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { HiDownload } from "react-icons/hi";
import { Seller } from "../../types";

interface Props {
  seller: Seller;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
  downloadUrl: string;
}

export const RequestCard = (props: Props) => {
  const { seller } = props;
  const { name, email } = seller.user;

  return (
    <Stack
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      bg="white"
      shadow={{ md: "base" }}
      spacing={4}
      maxW="sm"
    >
      <Box
        position="absolute"
        inset="0"
        height="20"
        bg="purple.600"
        roundedTop="inherit"
      />
      <Avatar size="xl" name={name} />
      <Stack direction="column" spacing="1" flex="1" alignItems="center">
        <Stack direction="row">
          <Text fontWeight="bold">{name}</Text>
        </Stack>
        <Text
          fontSize="sm"
          textAlign="center"
          noOfLines={2}
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {email}
        </Text>
      </Stack>
      <LinkOverlay
        href={props.downloadUrl}
        download={`${seller.user.name}-proposal.pdf`}
        style={{ width: "100%" }}
      >
        <Button colorScheme="purple" isFullWidth leftIcon={<HiDownload />}>
          Download Proposal
        </Button>
      </LinkOverlay>
      <Stack direction="row" spacing="3" width="100%">
        <Button
          variant="outline"
          colorScheme="green"
          isFullWidth
          onClick={() => props.onApprove(seller.id)}
        >
          Approve
        </Button>
        <Button
          variant="outline"
          colorScheme="red"
          isFullWidth
          onClick={() => props.onDeny(seller.id)}
        >
          Deny
        </Button>
      </Stack>
    </Stack>
  );
};
