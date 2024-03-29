import axios, { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Enum_PaymentType } from '../enums';
import { Alert, cItem, Loading, Order } from '../interfaces';
import { configAxios } from '../utils/configAxios';
import useAuth from './hooks/useAuth';

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
  implPayment: (orderId: number, paymentMethod: Enum_PaymentType) => void;
  handleBuy: (orderId: number) => void;
  getOrder: (id: number) => void;
  order: Order;
  selectShipperOrder: (orderId: number, shipperValue: number) => void;
  cancelOrder: (orderId: number) => void;
  getCartItem: () => void;
  cartLength: number;
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<cItem[]>([]);
  const [cartLength, setCartLength] = useState(0);
  const [loading, setLoading] = useState<Loading>(true);
  const [alert, setAlert] = useState<Alert>({} as Alert);
  const [order, setOrder] = useState<Order>({} as Order);

  const navigate = useNavigate();

  const { refreshToken } = useAuth();

  const config = configAxios();

  useEffect(() => {
    getCartItem();
  }, []);

  const getCartItem = async () => {
    const { data } = await axios(`${import.meta.env.VITE_URL_BACK}/cart/gz`, config);
    setCartItems(data);
    setCartLength(data.length); // this can be pulled with the profile request
  };

  const addToCart = async (bookId: number) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/cart`,
        { bookId },
        config
      );
      setCartItems([...cartItems.filter((c) => c.id !== data.id), data]);
      setCartLength((prev) => prev + data.quantity);
      setAlert({
        message: 'successfully added!',
        err: false,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        setAlert({
          message: error.response?.data.message,
          err: true,
        });
      }
    }
    setTimeout(() => {
      setAlert({} as Alert);
    }, 2000);
  };

  const removeFromCart = async (id: number) => {
    await axios.delete(`${import.meta.env.VITE_URL_BACK}/cart/${id}`, config);
    setCartItems([...cartItems.filter((c) => c.id !== id)]);
    let toSubtract = cartItems.find((x) => x.id === id);
    setCartLength((prev) => prev - (toSubtract?.quantity ?? 0));
  };

  const newOrder = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL_BACK}/order`, {}, config);
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

  const getOrder = async (id: number) => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_URL_BACK}/order/${id}`, config);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const implPayment = async (orderId: number, paymentType: Enum_PaymentType) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_URL_BACK}/payment/${orderId}`,
        { paymentType },
        config
      );
      navigate(`/order/${orderId}/fpayment`);
    } catch (error) {
      console.log(error);
    }
  };

  const selectShipperOrder = async (orderId: number, shipperValue: number) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/order/shipper/${orderId}`,
        { shipperValue },
        config
      );
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (orderId: number) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/order/cancel/${orderId}`,
        {},
        config
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (orderId: number) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/buy/${orderId}`,
        {},
        config
      );
      refreshToken();
      setTimeout(() => {
        navigate(`/order/${orderId}`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
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
        implPayment,
        handleBuy,
        getOrder,
        order,
        selectShipperOrder,
        cancelOrder,
        getCartItem,
        cartLength,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
