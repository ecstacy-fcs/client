import {
  Avatar,
  Box,
  HStack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

interface UserInfoProps {
  name: string;
  image?: string;
  email: string;
}

export const UserInfo = (props: UserInfoProps) => {
  const { name, image, email } = props;
  return (
    <HStack display="inline-flex">
      <Avatar size="sm" name={name} src={image} />
      <Box lineHeight="1">
        <Text fontWeight="semibold">{name}</Text>
        <Text fontSize="xs" mt="1" color={mode("whiteAlpha.700", "gray.400")}>
          {email}
        </Text>
      </Box>
    </HStack>
  );
};
