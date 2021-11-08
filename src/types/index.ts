export interface ProductImage {
  id: string;
  path: string;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  seller: {
    id: string;
    user: {
      name: string;
    };
  };
  images: ProductImage[];
  category: ProductCategory;
}

export interface ProductImage {
  path: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  verified: boolean;
  adminId?: string;
  sellerId?: string;
  adminProfile?: any;
  buyerProfile?: any;
  sellerProfile?: any;
  tokens?: any[];
}

export interface Seller {
  id: string;
  userId: string;
  approved: boolean;
  approvalDocument?: string;
  products?: Product[];
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type SellerDashboardTab =
  | "dashboard"
  | "add-product"
  | "edit-product"
  | "all-products"
  | "settings";

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  verified: boolean;
}
