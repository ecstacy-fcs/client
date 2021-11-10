import {
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Link,
  Box,
  Divider,
} from "@chakra-ui/react";
import Page from "~/components/Page";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <Page>
      <Box marginX="auto" paddingBottom={3} maxW="container.md">
        <Heading mb="2" size="lg">
          {" "}
          Ecstacy Privacy Policy{" "}
        </Heading>
        <Text as="span" fontWeight="semibold">
          {" "}
          Last Updated:
        </Text>{" "}
        <Text as="span" fontWeight="md">
          {" "}
          November 10, 2021
        </Text>
        <Divider mt="5" borderColor="grey" />
        <Text mt="5">
          We know that you care how information about you is used and shared,
          and we appreciate your trust that we will do so carefully and
          sensibly. This privacy notice describes how Ecstacy collects and
          processes your personal information through the website.
        </Text>
        <Text mt="2">
          By using Ecstacy you agree to our use of personal information
          (including sensitive personal information) in accordance with this
          Privacy Notice.
        </Text>
        <Heading mt="5" size="md">
          What Personal Information Does Ecstacy Collect?
        </Heading>
        <Text mt="2">
          We collect your personal information in order to provide our services.
          Here is the list of personal information we collect:
        </Text>
        <UnorderedList mt="2">
          <ListItem fontWeight="semibold" as="span">
            Information You Give Us:{" "}
          </ListItem>{" "}
          <Text as="span">
            We store your name, email address, phone number, address, and hashed
            password in our database. Ecstacy does not store your password as
            plain text.
          </Text>
          <Text></Text>
          <ListItem fontWeight="semibold" as="span">
            Automatic Information:{" "}
          </ListItem>{" "}
          <Text as="span">
            We automatically collect and store certain information about your
            use of Ecstacy, including information about your interaction with
            our content and our services. This includes cookies, your order
            history and your IP address.
          </Text>
        </UnorderedList>
        <Text mt="2">
          Ecstacy does not collect sensitive payment-related information like
          credit card details. All the orders' payment is carried out through
          the Razorpay payment gateway.
        </Text>
        <Heading mt="5" size="md">
          For What Purposes Does Ecstacy Use Your Personal Information?
        </Heading>
        <Text mt="2">
          We use your personal information to operate, provide, develop, and
          improve the products and services that we offer our customers. These
          purposes include:
        </Text>
        <UnorderedList mt="2">
          <ListItem fontWeight="semibold" as="span">
            Purchase and delivery of products and services:{" "}
          </ListItem>{" "}
          <Text as="span">
            We use your personal information to take and fulfill orders, deliver
            products and services.
          </Text>
          <Text></Text>
          <ListItem fontWeight="semibold" as="span">
            Security measures:{" "}
          </ListItem>{" "}
          <Text as="span">
            We use personal information to prevent and detect fraud and abuse in
            order to protect the security of our customers, Ecstacy, and others.
          </Text>
          <Text></Text>
          <ListItem fontWeight="semibold" as="span">
            Compliance with legal obligations:{" "}
          </ListItem>{" "}
          <Text as="span">
            {" "}
            In certain cases, we collect and use your personal information to
            comply with laws.
          </Text>
        </UnorderedList>
        <Text mt="2">
          Ecstacy will never share your personal information with any third
          party, ever.
        </Text>
        <Heading mt="5" size="md">
          What Choices Do You Have?
        </Heading>
        <Text mt="2">
          Ecstacy automatically uses cookies when you first visit the website to
          secure your browsing experience. You can always choose not to provide
          certain information like your address and phone number, but then you
          might not be able to place orders.
        </Text>
        <Heading mt="5" size="md">
          Information You Can Access
        </Heading>
        <Text mt="2">
          Examples of Information you can access through Ecstacy include:
        </Text>
        <UnorderedList>
          <ListItem>Your complete order history</ListItem>
          <ListItem>
            Personally identifing information (including name, email, phone
            number and address)
          </ListItem>
          <ListItem>
            If you are a seller on Ecstacy you can access and edit the complete
            list of your products, and can access your product-related orders.
          </ListItem>
          <ListItem>
            If you are an admin on Ecstacy you can access the list of all
            buyers, sellers and products, the complete event history/audit logs
            and the list of seller proposal documents.
          </ListItem>
          <ListItem>
            You can only browse through the marketplace and view products if you
            are not a registered user.
          </ListItem>
        </UnorderedList>
        <Heading mt="5" mb="2" size="md">
          Contact
        </Heading>
        <Text as="span">
          For any queries you can contact any of the members of{" "}
        </Text>{" "}
        <Text as="span" fontWeight="semibold">
          MDMA{" "}
        </Text>{" "}
        <Text as="span">listed below:</Text>
        <UnorderedList>
          <ListItem>
            Meetakshi Setiya{" "}
            <Link color="purple.600" href="mailto:meetakshi19253@iiitd.ac.in">
              (meetakshi19253@iiitd.ac.in)
            </Link>
          </ListItem>
          <ListItem>
            Dev Rajput{" "}
            <Link color="purple.600" href="mailto:dev19034@iiitd.ac.in">
              (dev19034@iiitd.ac.in)
            </Link>
          </ListItem>
          <ListItem>
            Mihir Chaturvedi{" "}
            <Link color="purple.600" href="mailto:mihir19061@iiitd.ac.in">
              (mihir19061@iiitd.ac.in)
            </Link>
          </ListItem>
          <ListItem>
            Ananya Lohani{" "}
            <Link color="purple.600" href="mailto:ananya19018@iiitd.ac.in">
              (ananya19018@iiitd.ac.in)
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </Page>
  );
}
