import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Loading';
import { OrderDetail } from '../components/OrderDetail';
import { Order as IOrder } from '../interfaces';
import { configAxios } from '../utils/configAxios';

export const Order = () => {
  const [order, setOrder] = useState<IOrder>({} as IOrder);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const token = localStorage.getItem('token');
  if (!token) return <Spinner />;

  const config = configAxios(token);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/order/${id}`,
          config
        );
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getOrder();
  }, []);
  if (loading) return <Spinner />;
  const total = order.order_details.reduce(
    (p, c) => p + c.book.price * c.quantity,
    0
  );
  return (
    <div className="md:flex md:justify-between">
      {order.order_details.map((od) => (
        <OrderDetail key={od.id} od={od} />
      ))}
      <div className="md:w-3/4 m-5 border-2 border-dashed rounded border-green-900 p-2">
        <p className="font-bold text-lg">Total: ${total}</p>

        <div className="flex justify-end">
          <button className="mx-2 bg-orange-400  text-white font-bold rounded py-2 px-3">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
