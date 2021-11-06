export interface Product {
  title: string;
  id: string;
  price: number;
  images: string[];
  seller: string;
}

export interface Seller {
  name: string;
  id: string;
  kyc: string;
  email: string;
  avatar: string;
}
