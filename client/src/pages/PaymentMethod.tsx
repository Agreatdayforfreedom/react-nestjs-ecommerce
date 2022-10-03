import React, { FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { useForm } from '../hooks/useForm';

export const PaymentMethod = () => {
  const { handleChange, form } = useForm();
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, [form]);

  let checked = false;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(form);
  };

  return (
    <div>
      <form
        className="w-3/4 mx-auto mt-5 flex justify-center"
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

        <Button bName="Continue" />
      </form>
    </div>
  );
};
