import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
  Textarea,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { fetcher } from "~/lib/api";
import { FileInput } from "../FileInput";

interface Props {}

const AddProduct = (props: Props) => {
  const submit = async (values: any, formData: any) => {
    const response = await fetcher("products", "POST", undefined, {
      headers: undefined,
      body: formData,
    });

    console.log("response", response.data);
  };

  return (
    <>
      <Heading size="lg" fontWeight="extrabold" mb="6">
        Add a Product
      </Heading>
      <Box maxW="sm">
        <Formik
          initialValues={{ name: "", description: "", price: "" }}
          onSubmit={() => {}}
        >
          {(props) => (
            <Form>
              <Stack spacing={3}>
                <Field name="name">
                  {({ field, form }: any) => (
                    <FormControl
                      id="name"
                      isInvalid={form.errors.name && form.touched.name}
                      color="gray.600"
                      isRequired
                    >
                      <FormLabel htmlFor="name">Product name</FormLabel>
                      <Input
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                        placeholder="Product name"
                        bg={mode("white", "gray.700")}
                        fontSize="md"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description">
                  {({ field, form }: any) => (
                    <FormControl
                      id="description"
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                      color="gray.600"
                      isRequired
                    >
                      <FormLabel htmlFor="description">
                        Product description
                      </FormLabel>
                      <Textarea
                        name="description"
                        type="description"
                        required
                        placeholder="Product description"
                        bg={mode("white", "gray.700")}
                        fontSize="md"
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field
                  name="price"
                  validate={(value: string) => {
                    let error;
                    if (!value) {
                      error = "Required";
                    } else if (isNaN(parseInt(value))) {
                      error = "Price must be a number";
                    }
                    return error;
                  }}
                >
                  {({ field, form }: any) => (
                    <FormControl
                      id="price"
                      isInvalid={form.errors.price && form.touched.price}
                      color="gray.600"
                      isRequired
                    >
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          fontSize="1.2em"
                          children="₹"
                        />
                        <Input
                          name="price"
                          type="price"
                          required
                          placeholder="Price"
                          bg={mode("white", "gray.700")}
                          fontSize="md"
                          {...field}
                        />{" "}
                      </InputGroup>
                      <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <FormControl id="price" color="gray.600" isRequired>
                  <FormLabel htmlFor="product-image">Product Images</FormLabel>
                  <Text marginTop="-2" marginBottom="2" fontSize="sm">
                    (at least 2)
                  </Text>
                  <FileInput
                    label="Add Product"
                    uploadFileName="product-image"
                    acceptedFileTypes="image/jpg"
                    allowMultipleFiles={true}
                    onChange={(formData) => submit(props.values, formData)}
                  />
                </FormControl>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddProduct;
