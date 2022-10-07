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
        <div className="flex flex-col my-3 justify-between md:w-1/3 md:mx-auto">
          <div className="text-center w-full mb-4 border-b pb-2">
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
          <div className="text-center border-b py-2">
            <p className="text-xs text-slate-700">
              price and arrival time are ilustratives.
            </p>
            <p className="text-gray-500 font-bold">
              Shipper:{' '}
              <span className="text-black">{order.shipper.company}</span>
            </p>
            <p className="text-gray-500 font-bold">
              price: <span className="text-black">35</span>
            </p>
            <p className="">
              The package arrives in{' '}
              <span className="font-bold text-lg">3</span> days
            </p>
          </div>
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
