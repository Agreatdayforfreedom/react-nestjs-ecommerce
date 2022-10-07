import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { OrderDetail } from '../components/OrderDetail';
import { Enum_PurchaseStatus } from '../enums';
import { PaymentGateway, Step } from '../components/PaymentGateway';
import useCart from '../context/hooks/useCart';
import { ArrowBack } from '../components/ArrowBack';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import axios from 'axios';
import { Shipper } from '../interfaces';
import { configAxios } from '../utils/configAxios';

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
      <div className="flex flex-col md:flex-row border-y py-1">
        <div className="order-last md:order-none md:w-1/3 pl-1">
          {order.order_details.map((od) => (
            <OrderDetail key={od.id} od={od} />
          ))}
        </div>
        <section className="p-2 md:w-2/3 border mx-1">
          <div className="flex flex-col justify-between h-full">
            {/* details order */}
            <div className="border-b">
              <p className="text-sm text-slate-600 text-end">
                Num order{order.num_order}
              </p>
              <p className="font-bold text-orange-400">Shipment: ${35}</p>
              <p className="font-bold text-orange-400 text-2xl">
                Total: ${total && total + 35}
                {/*  'sum 35 of the shipping' */}
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
            {/* shipper */}
            <ShipperCard />
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

export const ShipperCard = () => {
  const [formShipperEditMode, setFormShipperEditMode] = useState(false);

  const handleShipperChangeForm = () => {
    setFormShipperEditMode(!formShipperEditMode);
  };

  const { order } = useCart();

  return (
    <div className="flex items-center border-b pb-5 pt-3 my-3">
      {order.shipper === null ? (
        <SelectShipperForm orderId={order.id} />
      ) : (
        <div className="w-full">
          <p className="text-xs">price and arrival time are ilustratives.</p>
          <p className="text-gray-500 font-bold">
            Shipper: <span className="text-black">{order.shipper.company}</span>
          </p>
          <p className="text-gray-500 font-bold">
            price: <span className="text-black">35</span>
          </p>
          <p className="">
            The package arrives in <span className="font-bold text-lg">3</span>{' '}
            days
          </p>

          {order.purchase_status !== Enum_PurchaseStatus.PURCHASE && (
            <div className="text-end">
              {!formShipperEditMode && (
                <button
                  className="bg-green-700 text-white p-1 rounded hover:bg-green-800  transition-all"
                  onClick={handleShipperChangeForm}
                >
                  Change shipper
                </button>
              )}
              {formShipperEditMode && (
                <div>
                  <SelectShipperForm
                    formShipperEditMode={formShipperEditMode}
                    handleShipperChangeForm={handleShipperChangeForm}
                    orderId={order.id}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ShipperFormProps {
  orderId: number;
  formShipperEditMode?: boolean;
  handleShipperChangeForm?: () => void;
}

export const SelectShipperForm = ({
  orderId,
  formShipperEditMode,
  handleShipperChangeForm,
}: ShipperFormProps) => {
  const [shippers, setShippers] = useState<Shipper[]>([]);
  const [shipperValue, setShipperValue] = useState<number | null>();

  const { selectShipperOrder } = useCart();

  useEffect(() => {
    const getShipper = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/shipper`
        );
        setShippers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getShipper();
  }, []);

  const handleShipperValue = (evt: ChangeEvent<HTMLSelectElement>) => {
    setShipperValue(parseInt(evt.target.value, 10));
  };

  const handleShipperSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (shipperValue && orderId) {
      selectShipperOrder(orderId, shipperValue);
      if (typeof handleShipperChangeForm == 'function')
        handleShipperChangeForm();
    }
  };
  return (
    <form onSubmit={handleShipperSubmit} className="flex flex-col w-full mt-3">
      <div className="flex flex-col md:flex-row">
        <label className="font-bold text-start">Shipper: </label>
        <select
          className="bg-transparent border border-orange-500 rounded mx-2 p-2 hover:cursor-pointer"
          onChange={handleShipperValue}
        >
          <option disabled selected>
            --- Select ---
          </option>
          {shippers &&
            shippers.map((shipper: Shipper) => (
              <>
                <option value={shipper.id} key={shipper.id}>
                  {shipper.company}
                </option>
              </>
            ))}
        </select>
      </div>
      <div className="text-end py-1 px-2">
        {formShipperEditMode && (
          <button
            className="text-white bg-gray-700 rounded px-1 mx-1"
            onClick={handleShipperChangeForm}
          >
            Cancel
          </button>
        )}
        <button className="text-white bg-green-700 rounded px-1 mx-1">
          Save
        </button>
      </div>
    </form>
  );
};
