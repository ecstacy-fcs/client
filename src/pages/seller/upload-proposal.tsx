import { Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FileInput } from "~/components/FileInput";
import Dashboard from "~/components/seller/Dashboard";
import { useSeller } from "~/hooks/useSeller";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";

const UploadProposal: React.FC = () => {
  const { seller, mutate } = useSeller();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (seller && seller.approved) router.replace("/seller");
  }, [seller]);

  const onChange = async (formData: any) => {
    const { error } = await fetcher("sell/proposal", "POST", undefined, {
      headers: undefined,
      body: formData,
    });
    mutate();
    toastWrapper(
      toast,
      error,
      "Proposal uploaded!",
      "Your proposal will be reviewed by an admin"
    );
  };

  return (
    <Dashboard>
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
    </Dashboard>
  );
};

export default UploadProposal;
