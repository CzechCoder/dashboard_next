export interface UserType {
  _id?: string;
  username: string;
  email: string;
  password: string;
  img?: string;
  isActive?: boolean;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export interface ProductType {
  _id: string;
  title: string;
  desc: string;
  price: number;
  stock: number;
  img: string;
  createdAt: string;
}
