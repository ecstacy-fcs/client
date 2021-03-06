import {
  AspectRatio,
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { Product } from "../../types";
import { PriceTag } from "../PriceTag";
import EditProduct from "./EditProduct";

interface Props {
  product: Product;
  rootProps?: StackProps;
}

export const SellerProductCard = (props: Props) => {
  const toast = useToast();
  const { product, rootProps } = props;
  const { name, images, price, banned } = product;
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const deleteProduct = async () => {
    const { data, error } = await fetcher(`products/${product.id}`, "DELETE");
    toastWrapper(
      toast,
      error,
      "Product Deleted!",
      "Product deleted successfully"
    );
    onDeleteClose();
  };

  return (
    <>
      <Stack
        spacing={useBreakpointValue({ base: "4", md: "5" })}
        {...rootProps}
        maxW="sm"
      >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={
                images.length > 0 ? images[0].path : "/product-placeholder.png"
              }
              alt={name}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
            />
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text
              fontWeight="medium"
              color={useColorModeValue("gray.700", "gray.400")}
            >
              {name}
              {banned ? (
                <Badge ml="2" colorScheme="red" flexShrink={0}>
                  {`Banned`}
                </Badge>
              ) : (
                <></>
              )}
            </Text>
            <PriceTag price={price} />
          </Stack>
        </Stack>
        <Stack align="center">
          <NextLink href={`/products/${product.id}`}>
            <Button isFullWidth>View Product</Button>
          </NextLink>
          <Stack direction="row" width="full" spacing="2">
            <Button colorScheme="blue" isFullWidth onClick={onEditOpen}>
              Edit
            </Button>
            <Button colorScheme="red" isFullWidth onClick={onDeleteOpen}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this product? This action is
            permanent and irreversible.
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteProduct}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent paddingBottom={3}>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProduct product={product} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
