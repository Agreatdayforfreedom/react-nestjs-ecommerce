import { Alert, cItem } from '../interfaces';
import { FcMinus } from 'react-icons/fc';
import { GoPlus } from 'react-icons/go';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { configAxios } from '../utils/configAxios';
import useCart from '../context/hooks/useCart';

interface Props {
  c: cItem;
}

export const CartItem = ({ c }: Props) => {
  const token = localStorage.getItem('token');
  const config = configAxios(token!);

  const { removeFromCart, cartItems, setCartItems } = useCart();

  const handleChange = async (evt: ChangeEvent<HTMLSelectElement>) => {
    evt.preventDefault();
    const { data } = await axios.put(
      `${import.meta.env.VITE_URL_BACK}/cart/${c.id}`,
      { quantity: parseInt(evt.target.value, 10) },
      config
    );
    setCartItems([...cartItems.filter((c) => c.id !== data.id), data]);
  };

  return (
    <section>
      <div className="flex justify-between my-2 p-2 border-y transition-all">
        <div className="flex">
          <img src={c.book.image} alt={c.book.name} className="w-14" />

          <div className="mx-3">
            <h2 className="font-bold">{c.book.name}</h2>
            <p className="text-green-600">${c.book.price}</p>
            <h2>{c.book.author}</h2>
          </div>
        </div>
        <div className="lg:mr-24 transition-all">
          <select
            name="quantity"
            defaultValue={c.quantity}
            id="quantity"
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
          <p className="text-sm text-slate-600">
            Available stock: {c.book.stock}
          </p>
          <button
            onClick={() => removeFromCart(c.id)}
            className="text-red-700 my-2"
          >
            Remove
          </button>
        </div>
      </div>
    </section>
  );
};
