import { Heading } from "@chakra-ui/react";
import React from "react";
import { Seller } from "../../types";
import SellerApprovalStatus from "./SellerApprovalStatus";

interface Props {
  seller: Seller;
}

const SellerDashboard = ({ seller }: Props) => {
  return (
    <>
      <Heading size="lg" fontWeight="extrabold" mb="6">
        Dashboard
      </Heading>
      <SellerApprovalStatus approved={seller.approved} />
    </>
  );
};

export default SellerDashboard;
