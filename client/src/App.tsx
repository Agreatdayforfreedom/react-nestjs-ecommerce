import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
import { AdminLayout } from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import { Admin } from './pages/Admin';
import { Book } from './pages/Book';
import { Cart } from './pages/Cart';
import { CreateBook } from './pages/CreateBook';
import { CreateCategory } from './pages/CreateCategory';
import Home from './pages/Home';
import { Login } from './pages/Login';
import MyData from './pages/MyData';
import MyOrders from './pages/MyOrders';
import { Order } from './pages/Order';
import { Signup } from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Home />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="/my-data" element={<MyData />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/orders" element={<MyOrders />} />
            </Route>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/create" element={<CreateBook />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/create/category" element={<CreateCategory />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
