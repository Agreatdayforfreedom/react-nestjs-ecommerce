/*
 * finalize payment page
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PaymentGateway, Step } from '../components/PaymentGateway';
import { Spinner } from '../components/Spinner';
import useCart from '../context/hooks/useCart';

export const FPayment = () => {
  const [loading, setLoading] = useState(true);
  const { handleBuy, getOrder, order, loading: loadingCart } = useCart();
  const params = useParams();

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

  if (loading || loadingCart) return <Spinner />;
  return (
    <div>
      <PaymentGateway
        locationStatus={Step.purchase}
        purchaseStatus={order.purchase_status}
      />
      <h3 className="text-center my-2 text-slate-600 text-xl">
        Complete your purchase
      </h3>
      <div>here you can validate if everything is correct!</div>
      <button
        onClick={handleSubmit}
        className="mx-2 bg-orange-400  text-white font-bold rounded py-2 px-3"
      >
        Pay
      </button>
    </div>
  );
};
