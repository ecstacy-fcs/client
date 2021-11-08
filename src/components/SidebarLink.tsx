import {
  Box,
  BoxProps,
  createIcon,
  HStack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

interface SidebarLinkProps extends BoxProps {
  icon?: React.ReactElement;
  avatar?: React.ReactElement;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const SidebarLink = (props: SidebarLinkProps) => {
  const {
    children,
    icon = <ArrowRight />,
    avatar,
    disabled = false,
    onClick,
    ...rest
  } = props;

  if (disabled)
    return (
      <Box
        as="a"
        marginEnd="2"
        fontSize="sm"
        display="block"
        px="3"
        py="1"
        rounded="md"
        color="gray.500"
        className="group"
        fontWeight="medium"
        cursor="not-allowed"
        {...rest}
      >
        <HStack>
          <Box opacity={0.5}>{avatar || icon}</Box>
          <Text>{children}</Text>
        </HStack>
      </Box>
    );

  return (
    <Box
      as="a"
      marginEnd="2"
      fontSize="sm"
      display="block"
      px="3"
      py="1"
      rounded="md"
      cursor="pointer"
      _hover={{ color: "white", bg: mode("purple.700", "gray.600") }}
      className="group"
      fontWeight="medium"
      transition="background .1s ease-out"
      onClick={props.onClick}
      {...rest}
    >
      <HStack>
        <Box opacity={avatar ? 1 : 0.5} _groupHover={{ opacity: 1 }}>
          {avatar || icon}
        </Box>
        <Text>{children}</Text>
      </HStack>
    </Box>
  );
};

const ArrowRight = createIcon({
  viewBox: "0 0 16 16",
  path: (
    <path
      d="M3.38974 12.6633L9.42974 12.6633C9.86308 12.6633 10.2697 12.4567 10.5164 12.1033L13.1497 8.39C13.3164 8.15667 13.3164 7.85 13.1497 7.61667L10.5097 3.89667C10.2697 3.54334 9.86308 3.33667 9.42974 3.33667L3.38974 3.33667C2.84974 3.33667 2.53641 3.95667 2.84974 4.39667L5.42974 8.00334L2.84974 11.61C2.53641 12.05 2.84974 12.6633 3.38974 12.6633V12.6633Z"
      fill="currentcolor"
    />
  ),
});
