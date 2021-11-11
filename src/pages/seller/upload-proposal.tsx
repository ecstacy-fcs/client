import { Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FileInput } from "~/components/FileInput";
import Dashboard from "~/components/seller/Dashboard";
import { useSeller } from "~/hooks/useSeller";
import { fetcher } from "~/lib/api";
import { toastWrapper } from "~/lib/toast";

const UploadProposal: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { seller, mutate } = useSeller();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (seller && (seller.approved || seller.approvalDocument))
      router.replace("/seller");
  }, [seller]);

  const onChange = async (formData: any) => {
    setLoading(true);
    const { error } = await fetcher("sell/proposal", "POST", formData, true);
    setLoading(false);
    mutate();
    toastWrapper(
      toast,
      error,
      "Proposal uploaded!",
      "Your proposal will be reviewed by an admin"
    );
    if (!error) router.push("/seller");
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
          isLoading={loading}
        />
      </>
    </Dashboard>
  );
};

export default UploadProposal;
