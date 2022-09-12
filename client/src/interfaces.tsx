export interface Category {
  id: number;
  name: string;
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

export interface FormSignUp extends User {
  rpassword: string;
}

export interface Alert {
  message: string;
  err: boolean;
}
