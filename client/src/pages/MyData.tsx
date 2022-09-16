/*
 * customers page!
 *
 * customers page!
 * */

import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { configAxios } from '../utils/configAxios';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  city: string;
  country: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

const MyData = () => {
  return (
    <>
      <FormCustomer />
    </>
  );
};

export const FormCustomer = () => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const { handleChange, form } = useForm<Customer>();

  const token = localStorage.getItem('token');
  const config = configAxios(token!);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/customers`,
        config
      );
      setCustomer(data[0]);
    };
    fetch();
  }, []);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (customer) {
      console.log(form);
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/customers/${customer.id}`,
        form,
        config
      );
      setCustomer(data);
    } else {
      console.log('error');
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/customers`,
        form,
        config
      );
      setCustomer(data[0]);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-100 mt-10 p-10 rounded-md shadow-md m-auto md:w-4/6 lg:w-1/2"
    >
      <div className="flex flex-col my-3">
        <label htmlFor="firstName" className="mb-1 font-bold text-slate-600">
          First name
        </label>
        <input
          className="p-2 border"
          type="text"
          name="firstName"
          defaultValue={customer && customer.firstName}
          placeholder="First name"
          id="firstName"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="lastName" className="mb-1 font-bold text-slate-600">
          Last name
        </label>
        <input
          className="p-2 border"
          type="text"
          name="lastName"
          defaultValue={customer && customer.lastName}
          placeholder="Last name"
          id="lastName"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="phone" className="mb-1 font-bold text-slate-600">
          Phone number
        </label>
        <input
          className="p-2 border"
          type="tel"
          name="phone"
          defaultValue={customer && customer.phone}
          placeholder="+1 112334456"
          id="phone"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="city" className="mb-1 font-bold text-slate-600">
          City
        </label>
        <input
          className="p-2 border"
          type="text"
          name="city"
          defaultValue={customer && customer.city}
          placeholder="Lima"
          id="city"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="country" className="mb-1 font-bold text-slate-600">
          Country
        </label>
        <input
          className="p-2 border"
          type="text"
          name="country"
          defaultValue={customer && customer.country}
          placeholder="Argentina, Perú, etc."
          id="country"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="state" className="mb-1 font-bold text-slate-600">
          State
        </label>
        <input
          className="p-2 border"
          type="text"
          name="state"
          defaultValue={customer && customer.state}
          placeholder="Buenos aires"
          id="state"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="border px-4 py-3 bg-orange-400 
          rounded-md font-bold text-white hover:bg-orange-500 transition-all"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default MyData;
