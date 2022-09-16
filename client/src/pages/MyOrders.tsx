import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Order } from '../interfaces';
import { configAxios } from '../utils/configAxios';

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  if (!token) return <p>loading</p>;

  const config = configAxios(token);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/order/`,
        config
      );
      setOrders(data);
      setLoading(false);
    };
    getOrders();
  }, []);

  if (loading) return <p>loading</p>;
  return (
    <div>
      {orders.map((o) => (
        <div>{/* <p>Num Order {o.num_order}</p> */}</div>
      ))}
    </div>
  );
};

export default MyOrders;
