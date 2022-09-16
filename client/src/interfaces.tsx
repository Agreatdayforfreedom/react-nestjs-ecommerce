export interface Category {
  id: number;
  name: string;
}

export interface Metadata {
  pages: number;
  publisher: string;
  language: string;
}

export interface Book {
  id: number;
  author: string;
  categories: Category[];
  name: string;
  price: number;
  image?: string;
  review: string;
  stock: number;
  metadata?: Metadata;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface cItem {
  id: number;
  quantity: number;
  book: Book;
}

export interface Cart {
  cItem: cItem[];
  user: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  city: string;
  country: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDetails {
  id: number;
  quantity: number;
  book: Book;
}

export interface Order {
  id: number;
  customer: Customer;
  order_details: OrderDetails[];
  num_order: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSignUp extends User {
  rpassword: string;
}

export interface Alert {
  message: string;
  err: boolean;
}

//types
export type Loading = boolean;
