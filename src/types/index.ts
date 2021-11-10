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
  banned: boolean;
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

export interface SellerOrder {
  id: string;
  time: Date;
  product: {
    id: string;
    name: string;
    price: number;
  };
  buyer: {
    user: {
      name: string;
    };
  };
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
  adminId?: string;
  sellerId?: string;
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

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  verified: boolean;
}

export interface Buyer {
  id: string;
  user: User;
}

export interface Order {
  id: string;
  status: boolean;
  time: Date;
  quantity: number;
  buyer: {
    id: string;
  };
  product: {
    id: string;
    name: string;
    price: number;
    seller: {
      id: string;
      user: {
        name: string;
      };
    };
  };
}
