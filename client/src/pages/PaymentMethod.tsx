import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { PaymentGateway, Step } from '../components/PaymentGateway';
import { Spinner } from '../components/Spinner';
import useCart from '../context/hooks/useCart';
import { Enum_PaymentType } from '../enums';
import { useForm } from '../hooks/useForm';
import { Alert } from '../interfaces';

export const PaymentMethod = () => {
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState<boolean>(false);
  const [checkValue, setCheckedValue] = useState<Enum_PaymentType | ''>('');
  const [alert, setAlert] = useState<Alert>({} as Alert);

  const params = useParams();

  const { implPayment, getOrder, order } = useCart();

  useEffect(() => {
    if (params.orderId) {
      getOrder(parseInt(params.orderId, 10));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (checked == false) {
      setCheckedValue(evt.target.value as Enum_PaymentType);
    } else {
      setCheckedValue('');
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!checkValue) {
      setAlert({ message: 'You must choose a payment method!', err: true });
      setTimeout(() => {
        setAlert({} as Alert);
      }, 3000);
    }
    if (params.orderId && checkValue) {
      implPayment(parseInt(params.orderId, 10), checkValue);
    }
  };

  const { message } = alert;

  if (loading) return <Spinner />;
  return (
    <div>
      <PaymentGateway
        locationStatus={Step.payment}
        purchaseStatus={order.purchase_status}
      />

      <form
        className="w-3/4 mx-auto border p-2 mt-5 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="p-5 border rounded w-fit flex items-center">
          <label
            htmlFor="paymentType"
            className="text-xl font-bold text-slate-500 mx-2"
          >
            LIBSCredits
          </label>
          <input
            type="checkbox"
            name="paymentType"
            id="paymentType"
            value="LIBSCREDITS"
            className="w-5 h-5"
            checked={checked}
            onChange={handleChange}
          />
        </div>
        <p className="text-red-500">{message && message}</p>
        <div className="mt-4 w-full text-center md:text-end">
          <Button bName="Continue" />
        </div>
      </form>
    </div>
  );
};
