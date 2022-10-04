import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { OrderDetail } from '../components/OrderDetail';
import { Order as IOrder } from '../interfaces';
import { configAxios } from '../utils/configAxios';
import useAuth from '../context/hooks/useAuth';
import { Enum_PurchaseStatus } from '../enums';
import { PaymentGateway, Step } from '../components/PaymentGateway';
import useCart from '../context/hooks/useCart';

export const Order = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let total;

  const { getOrder, order } = useCart();

  useEffect(() => {
    if (id) {
      getOrder(parseInt(id, 10));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  if (loading) return <Spinner />;

  if (order.order_details) {
    total = order.order_details.reduce(
      (p, c) => p + c.book.price * c.quantity,
      0
    );
  }
  return (
    <section>
      <PaymentGateway
        locationStatus={Step.order}
        purchaseStatus={order.purchase_status}
      />

      <div className="md:flex md:justify-between">
        {order.order_details.map((od) => (
          <OrderDetail key={od.id} od={od} />
        ))}
        <div className="md:w-3/4 m-5 border-2 border-dashed rounded border-green-900 p-2">
          <p className="font-bold text-lg">Total: ${total}</p>

          <div className="flex justify-end">
            {order.purchase_status === Enum_PurchaseStatus.PURCHASE ? (
              <button className="mx-2 bg-red-600 text-white font-bold p-2 rounded hover:bg-red-800 transition-all">
                Cancel
              </button>
            ) : (
              <Link
                to={
                  order.payment === null
                    ? `/order/${order.id}/payment`
                    : `/order/${order.id}/fpayment`
                }
                className="mx-2 bg-orange-400  text-white font-bold rounded py-2 px-3"
              >
                Continue
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const LoadPage = () => {
  //check
  return (
    <div className="absolute h-screen">
      <Spinner />
    </div>
  );
};
