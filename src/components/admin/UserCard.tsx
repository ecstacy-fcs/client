import {
  Avatar,
  Box,
  Button,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

export const UserCard = ({
  name,
  email,
  buttonText,
  onButtonClick,
  buttonColor,
}: any) => (
  <Stack
    alignItems="center"
    rounded="md"
    padding="8"
    position="relative"
    bg="white"
    shadow={{ md: "base" }}
    spacing={5}
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
    <Button
      colorScheme={buttonColor}
      variant="outline"
      onClick={onButtonClick}
      isFullWidth
    >
      {buttonText}
    </Button>
  </Stack>
);
