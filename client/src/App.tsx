import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { BookProvider } from './context/BookProvider';
import { CartProvider } from './context/CartProvider';
import { QuestionsProvider } from './context/QuestionsProvider';
import { AdminLayout } from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import { AddMetadata } from './pages/AddMetadata';
import { Admin } from './pages/Admin';
import { Book } from './pages/Book';
import { Books } from './pages/Books';
import { Cart } from './pages/Cart';
import { Categories } from './pages/Categories';
import { CreateBook } from './pages/CreateBook';
import { CreateCategory } from './pages/CreateCategory';
import { FPayment } from './pages/FPayment';
import Home from './pages/Home';
import { Login } from './pages/Login';
import MyData from './pages/MyData';
import MyOrders from './pages/MyOrders';
import { New } from './pages/New';
import { Order } from './pages/Order';
import { PaymentMethod } from './pages/PaymentMethod';
import { Signup } from './pages/Signup';
import { BestSellers } from './pages/BestSellers';
import { UpdateBook } from './pages/UpdateBook';
import { UpdateMetadata } from './pages/UpdateMetadata';
import { useEffect } from 'react';
import { SearchBooksByParams } from './pages/SearchBooksByParams';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <BookProvider>
            <QuestionsProvider>
              <Routes>
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Home />} />

                  <Route path="book/:id" element={<Book />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="login" element={<Login />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="books" element={<SearchBooksByParams />} />
                  <Route path="new" element={<New />} />
                  <Route path="bestsellers" element={<BestSellers />} />
                </Route>
                <Route path="/" element={<MainLayout />}>
                  <Route path="my-data" element={<MyData />} />
                  <Route path="order/:id" element={<Order />} />
                  <Route path="orders" element={<MyOrders />} />
                  <Route
                    path="order/:orderId/payment"
                    element={<PaymentMethod />}
                  />
                  <Route
                    path="order/:orderId/fpayment"
                    element={<FPayment />}
                  />
                </Route>
                <Route path="/" element={<AdminLayout />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/create-book" element={<CreateBook />} />
                  <Route
                    path="/admin/update-book/:id"
                    element={<UpdateBook />}
                  />
                  <Route
                    path="/admin/add-metadata/:id"
                    element={<AddMetadata />}
                  />
                  <Route
                    path="/admin/update-metadata/:idM"
                    element={<UpdateMetadata />}
                  />
                  <Route
                    path="admin/create-category"
                    element={<CreateCategory />}
                  />
                </Route>
              </Routes>
            </QuestionsProvider>
          </BookProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
