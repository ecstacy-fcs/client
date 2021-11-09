import { Heading, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { KeyedMutator } from "swr";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";
import { FileInput } from "../FileInput";

interface Props {
  mutate: KeyedMutator<{
    data?: unknown;
    error?: string | undefined;
  }>;
}

const SellerProposalUpload = (props: Props) => {
  const toast = useToast();

  const onChange = async (formData: any) => {
    let response;
    try {
      response = await fetcher("sell/proposal", "POST", undefined, {
        headers: undefined,
        body: formData,
      });
      props.mutate();
    } catch (err) {
      console.error(err);
    }

    toastWrapper(
      toast,
      response?.error,
      "Proposal uploaded!",
      "Your proposal will be reviewed by an admin"
    );
  };

  return (
    <>
      <Heading size="lg" fontWeight="extrabold" mb="6">
        Apply to be a Seller
      </Heading>
      <Text marginBottom={3}>
        Upload your proposal to become a seller in the form of a PDF document.
      </Text>
      <FileInput
        acceptedFileTypes="application/pdf"
        label="Upload Proposal"
        uploadFileName="proposal"
        onChange={onChange}
      />
    </>
  );
};

export default SellerProposalUpload;
