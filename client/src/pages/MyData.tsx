/*
 * customers page!
 *
 * customers page!
 * */

import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { ArrowBack } from '../components/ArrowBack';
import useCart from '../context/hooks/useCart';
import { useForm } from '../hooks/useForm';
import { Alert, Customer } from '../interfaces';
import { configAxios } from '../utils/configAxios';
import useAuth from '../context/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const MyData = () => {
  return (
    <>
      <FormCustomer isCart={false} />
    </>
  );
};

interface Props {
  // if the form is true then it is in the cart, if not, it is here
  isCart: boolean;
}

export const FormCustomer = ({ isCart }: Props) => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [alert, setAlert] = useState('');
  const { handleChange, form } = useForm<Customer>();
  // const { auth } = useAuth();
  //to remove form cart if cancel is clicked
  const navigate = useNavigate();

  const config = configAxios();

  useEffect(() => {
    const fetch = async () => {
      const url = `${import.meta.env.VITE_URL_BACK}/customers`;
      const { data } = await axios(url, config);

      setCustomer(data[0]);
    };
    fetch();
  }, []);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (customer) {
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/customers/${customer.id}`,
        form,
        config
      );
      if (data) {
        setCustomer(data);
        setAlert('Updated');
      }
    } else {
      const { data } = await axios.post(`${import.meta.env.VITE_URL_BACK}/customers`, form, config);
      console.log(data);
      setAlert('Saved');
      setCustomer(data[0]);
    }
  };
  return (
    <section className="relative flex">
      <ArrowBack to="/" />
      <form
        onSubmit={handleSubmit}
        className={`${
          isCart ? 'bg-lime-700' : 'bg-slate-100'
        } mt-10 p-10 mx-auto rounded-md shadow-md md:w-4/6 lg:w-1/2`}
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
        <div className="flex justify-end items-center">
          {isCart && (
            <button
              type="submit"
              className="border px-4 py-3 bg-blue-600 
          rounded-md font-bold mx-2 text-white hover:bg-blue-700 transition-all"
            >
              Cancel
            </button>
          )}
          {alert && <p className="text-green-500 font-bold">{alert}</p>}
          <button
            type="submit"
            className="border px-4 py-3 mx-2 bg-orange-400 
          rounded-md font-bold text-white hover:bg-orange-500 transition-all"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default MyData;
