import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FileInput } from "~/components/FileInput";
import Dashboard from "~/components/seller/Dashboard";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import validate from "~/lib/validate";

const NewProduct: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const submit = async (
    formData: any,
    props: FormikProps<{
      name: string;
      description: string;
      price: string;
      category: string;
    }>
  ) => {
    const response = await fetcher("products", "POST", props.values);
    let productId;
    if(!response.error)productId = response.data.id;
    let res;

    if (!response.error) {
      setLoading(true);
      res = await fetcher(
        `products/${productId}/images`,
        "POST",
        formData,
        true
      );
      setLoading(false);
      props.resetForm();
      router.reload();
    }

    toastWrapper(
      toast,
      response.error || res?.error,
      "Product Added!",
      "Product added successfully"
    );
  };

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetcher("products/categories").then((res) => {
      if (res.data) setCategories([...res.data]);
    });
  }, []);

  return (
    <Dashboard>
      <>
        <Heading size="lg" fontWeight="extrabold" mb="6">
          Add a Product
        </Heading>
        <Box maxW="sm">
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              category: "",
            }}
            onSubmit={() => {}}
          >
            {(props) => (
              <Form>
                <Stack spacing={3}>
                  <Field name="name" validate={validate.required}>
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
                  <Field name="description" validate={validate.required}>
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
                  <Field name="price" validate={validate.number}>
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
                  <Field name="category" validate={validate.required}>
                    {({ field, form }: any) => (
                      <FormControl
                        id="category"
                        isInvalid={
                          form.errors.category && form.touched.category
                        }
                        color="gray.600"
                        isRequired
                      >
                        <FormLabel htmlFor="category">Category</FormLabel>
                        <Select
                          placeholder="Select category"
                          bg={mode("white", "gray.700")}
                          color="gray.600"
                          {...field}
                        >
                          {categories.map((item) => (
                            <option value={item.id}>{item.name}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.category}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <FormControl id="price" color="gray.600" isRequired>
                    <FormLabel htmlFor="product-image">
                      Product Images
                    </FormLabel>
                    <Text marginTop="-2" marginBottom="2" fontSize="sm">
                      (at least 2)
                    </Text>
                    <FileInput
                      validateForm={props.validateForm}
                      label="Add Product"
                      uploadFileName="product-image"
                      acceptedFileTypes="image/*"
                      allowMultipleFiles={true}
                      minFiles={2}
                      onChange={(formData) => submit(formData, props)}
                      isLoading={loading}
                    />
                  </FormControl>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </>
    </Dashboard>
  );
};

export default NewProduct;
