export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sellerId: string;
  categoryId: string;
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
