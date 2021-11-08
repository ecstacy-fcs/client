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
  banned: boolean;
  deleted?: boolean;
  adminProfile?: any;
  buyerProfile?: any;
  sellerProfile?: any;
  tokens?: any[];
}

export interface Seller {
  id: string;
  approved: boolean;
  approvalDocument?: string;
  user: User;
  products?: Product[];
}

export interface Buyer {
  id: string;
  user: User;
}

export type AdminDashboardTab = 'products' | 'buyers' | 'sellers' | 'approval-requests';

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  verified: boolean;
}
