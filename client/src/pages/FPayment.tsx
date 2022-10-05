/*
 * finalize payment page
 */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowBack } from '../components/ArrowBack';
import { PaymentGateway, Step } from '../components/PaymentGateway';
import { Spinner } from '../components/Spinner';
import useCart from '../context/hooks/useCart';

export const FPayment = () => {
  const [loading, setLoading] = useState(true);
  const { handleBuy, getOrder, order, loading: loadingCart } = useCart();
  const params = useParams();
  let total;
  useEffect(() => {
    if (params.orderId) {
      getOrder(parseInt(params.orderId, 10));
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = () => {
    if (params.orderId) {
      handleBuy(parseInt(params.orderId, 10));
    }
  };
  if (order.order_details) {
    total = order.order_details.reduce(
      (p, c) => p + c.book.price * c.quantity,
      0
    );
  }
  if (loading || loadingCart) return <Spinner />;
  return (
    <section>
      <div className="relative h-8">
        <ArrowBack to={`/order/${params.orderId}`} />
      </div>
      <PaymentGateway
        locationStatus={Step.purchase}
        purchaseStatus={order.purchase_status}
      />
      <h3 className="text-center my-2 text-slate-600 text-xl">
        Complete your purchase
      </h3>
      <div className="border flex flex-col justify-end">
        <div className="flex justify-between w-1/3 mx-auto">
          <div className="text-center">
            <h3 className="text-orange-400 text-lg font-bold">
              {order.payment.paymentType}
            </h3>
            <p className="text-slate-600 mb-2">
              Do you want to choose another payment method?
            </p>
            <Link
              to="#"
              className="bg-blue-600 rounded p-1 text-white hover:bg-blue-700"
            >
              Change Payment
            </Link>
          </div>
          <div>shipping</div>
        </div>
        <div className="w-2/3 mx-auto text-end mt-8 py-1">
          <button
            onClick={handleSubmit}
            className="mx-2 text-orange-400 border-2 font-bold rounded py-2 px-6 hover:border-orange-500 transition-all"
          >
            Pay
          </button>
        </div>
      </div>
    </section>
  );
};
