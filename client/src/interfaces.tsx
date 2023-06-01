import { Enum_PaymentType, Enum_PurchaseStatus } from './enums';

export interface Category {
  id: number;
  name: string;
}

export interface Metadata {
  id?: string;
  pages: number;
  publisher: string;
  language: string;
  book: Book;
}

export interface Message {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  message: string;
  user?: User;
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
  stars: number;
  format: string;
  isbn: string;
  metadata?: Metadata;
  messages: Message[];
  createdAt?: string;
  updatedAt?: string;
  isNew: boolean;
}

export interface User {
  id: number;
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

interface Payment {
  id: number;
  paymentType: Enum_PaymentType;
}

export interface Shipper {
  id: number;
  company: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  customer: Customer;
  order_details: OrderDetails[];
  num_order: string;
  payment: Payment;
  shipper: Shipper;
  purchase_status: Enum_PurchaseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSignUp extends User {
  rpassword: string;
}

export interface Category {
  id: number;
  name: string;
  books: Book[];
}

export interface Alert {
  message: string;
  err: boolean;
}

//types
export type Loading = boolean;
