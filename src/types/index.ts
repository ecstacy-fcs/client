export interface Product {
  title: string;
  id: string;
  price: number;
  images: string[];
  seller: string;
  description: string;
  category: string;
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
  name: string;
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
