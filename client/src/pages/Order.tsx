import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { OrderDetail } from '../components/OrderDetail';
import { Enum_PurchaseStatus } from '../enums';
import { PaymentGateway, Step } from '../components/PaymentGateway';
import useCart from '../context/hooks/useCart';
import { ArrowBack } from '../components/ArrowBack';
import { HiOutlineLocationMarker } from 'react-icons/hi';

export const Order = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let total;
  let totalItems;
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

    totalItems = order.order_details.reduce((p, c) => p + c.quantity, 0);
  }
  return (
    <section>
      <div className="relative h-8">
        <ArrowBack to="/orders" />
      </div>
      <PaymentGateway
        locationStatus={Step.order}
        purchaseStatus={order.purchase_status}
      />
      {order.purchase_status === Enum_PurchaseStatus.PURCHASE && (
        <h3 className="text-xl text-orange-400 font-bold text-center mb-4">
          Thanks for your purchase!
        </h3>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="order-last md:order-none md:w-1/3">
          {order.order_details.map((od) => (
            <OrderDetail key={od.id} od={od} />
          ))}
        </div>
        <section className="p-2 md:w-2/3 h-96 border mx-1">
          <div className="flex flex-col justify-between h-full">
            {/* details order */}
            <div className="border-b">
              <p className="text-sm text-slate-600 text-end">
                Num order{order.num_order}
              </p>
              <p className="font-bold text-orange-400 text-2xl">
                Total: ${total}
              </p>
              <p>Items: {totalItems}</p>
              {order.payment && (
                <p className="text-slate-500 flex items-end">
                  You have selected {order.payment.paymentType}!
                </p>
              )}
              <p className="text-slate-600 text-end">
                Emitted: {order.createdAt.toString().substring(0, 10)}
              </p>
            </div>
            {/* info */}
            <div className="border-b flex">
              <HiOutlineLocationMarker size={30} className="text-blue-500" />
              <ul className="px-2 w-full">
                <li>
                  <p className="text-slate-600">
                    For:{' '}
                    <span className="font-bold">
                      {order.customer.firstName}
                    </span>
                  </p>
                </li>
                <li>
                  <p className="text-slate-600">
                    Address:{' '}
                    <span className="font-bold">
                      {order.customer.city}, {order.customer.state},{' '}
                      {order.customer.country}
                    </span>
                  </p>
                </li>
                <li>
                  <p className="text-slate-600">
                    Phone contact:{' '}
                    <span className="font-bold">{order.customer.phone}</span>
                  </p>
                </li>
                <li className="text-end">
                  <Link
                    to="/my-data"
                    className="bg-blue-600 rounded p-1 text-white hover:bg-blue-700"
                  >
                    Update
                  </Link>
                  <p className="text-xs flex items-end justify-end mt-1 text-slate-600">
                    If you update your personal data, all orders will be
                    affected{' '}
                  </p>
                </li>
              </ul>
            </div>
            <div>shipping</div>
            {/* buttons */}
            <div className="flex justify-end">
              {order.purchase_status === Enum_PurchaseStatus.PURCHASE ? (
                <>
                  <p className="flex items-end text-sm text-slate-700">
                    You can cancel the purchase whenever you want.
                  </p>

                  <button className="mx-2 bg-red-600 text-white font-bold p-2 rounded hover:bg-red-800 transition-all">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {order.payment === null && (
                    <p className={'text-red-500 text-end flex items-end'}>
                      Add a payment method!
                    </p>
                  )}
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
                </>
              )}
            </div>
          </div>
        </section>
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
