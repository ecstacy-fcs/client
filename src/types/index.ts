export interface Product {
  title: string;
  id: string;
  price: number;
  images: string[];
  seller: string;
  description: string;
  category: string;
}

export interface Seller {
  name: string;
  id: string;
  kyc: string;
  email: string;
  avatar: string;
}

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  verified: boolean;
}
