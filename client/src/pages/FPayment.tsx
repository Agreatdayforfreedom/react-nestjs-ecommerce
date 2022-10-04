/*
 * finalize payment page
 */

import { useParams } from 'react-router-dom';
import { PaymentGateway, Step } from '../components/PaymentGateway';
import useCart from '../context/hooks/useCart';

export const FPayment = () => {
  const { handleBuy, getOrder, order } = useCart();
  const params = useParams();

  const handleSubmit = () => {
    if (params.orderId) {
      handleBuy(parseInt(params.orderId, 10));
      getOrder(parseInt(params.orderId, 10));
    }
  };

  return (
    <div>
      <PaymentGateway
        locationStatus={Step.purchase}
        purchaseStatus={order.purchase_status}
      />

      <button
        onClick={handleSubmit}
        className="mx-2 bg-orange-400  text-white font-bold rounded py-2 px-3"
      >
        Continue
      </button>
    </div>
  );
};
