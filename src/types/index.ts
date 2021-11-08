export interface ProductImage {
  id: string,
  path: string,
  productId: string
}

export interface Product {
  title: string;
  id: string;
  price: number;
  images: ProductImage[];
  seller: string;
  description: string;
  category: string;
}

export interface Seller {
  name: string;
}

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  verified: boolean;
}
