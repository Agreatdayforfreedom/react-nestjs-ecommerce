import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/Loading';
import { Order } from '../interfaces';
import { configAxios } from '../utils/configAxios';

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  if (!token) return <Spinner />;

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

  if (loading) return <Spinner />;
  return (
    <div>
      {orders.map((o) => (
        <div className="flex justify-between items-end m-2 p-2 border w-11/12 mx-auto hover:shadow-2xl hover:w-[93%] transition-all">
          <div>
            <p>{o.order_details.length} Products</p>
            <p>Num Order {o.num_order}</p>
          </div>
          <Link
            to={`/order/${o.id}`}
            className="bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-700"
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
