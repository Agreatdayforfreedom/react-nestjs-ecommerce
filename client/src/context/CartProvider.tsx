import axios, { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, cItem, Loading, Order } from '../interfaces';
import { configAxios } from '../utils/configAxios';

interface Props {
  children: ReactNode;
}

interface CartContextProps {
  cartItems: cItem[];
  setCartItems: (state: cItem[]) => void;
  loading: Loading;
  setLoading: (state: Loading) => void;
  addToCart: (bookId: number) => void;
  alert: Alert;
  setAlert: (state: Alert) => void;
  removeFromCart: (id: number) => void;
  newOrder: () => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<cItem[]>([]);
  const [loading, setLoading] = useState<Loading>(true);
  const [alert, setAlert] = useState<Alert>({} as Alert);

  const navigate = useNavigate();

  const token: string | null = localStorage.getItem('token');

  const config = configAxios(token!);

  useEffect(() => {
    const getCartItem = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/cart/gz`,
        config
      );
      setCartItems(data);
      setLoading(false);
    };
    getCartItem();
  }, []);

  const addToCart = async (bookId: number) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/cart`,
        { bookId },
        config
      );
      setCartItems([...cartItems.filter((c) => c.id !== data.id), data]);
      setAlert({
        message: 'successfully added!',
        err: false,
      });
    } catch (error) {
      const err = error as any;
      setAlert({
        message: err.response.data.message,
        err: true,
      });
    }
    setTimeout(() => {
      setAlert({} as Alert);
    }, 2000);
    setLoading(false);
  };

  const removeFromCart = async (id: number) => {
    await axios.delete(`${import.meta.env.VITE_URL_BACK}/cart/${id}`, config);
    setCartItems([...cartItems.filter((c) => c.id !== id)]);
  };

  const newOrder = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/order`,
        {},
        config
      );
      console.log(data);
      navigate(`/order/${data.id}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setAlert({ message: error.response.data.message, err: true });
        setTimeout(() => {
          setAlert({} as Alert);
        }, 2000);
      }
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        loading,
        addToCart,
        setLoading,
        alert,
        setAlert,
        removeFromCart,
        newOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};