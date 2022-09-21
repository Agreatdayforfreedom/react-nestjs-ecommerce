import React, { useState } from 'react';
import useBook from '../context/hooks/useBook';

export const OrderMenu = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  const { search } = useBook();

  const toggleActions = () => {
    setHidden(!hidden);
  };

  return (
    <div className="flex justify-end my-1">
      <div className="hidden md:block mx-2 p-1 px-4 bg-orange-400 font-bold text-white relative">
        <button onClick={() => toggleActions()}>Order by</button>
        <ul
          className={`${
            hidden
              ? 'block w-44 transition-all'
              : 'hidden w-0 h-0 transition-all'
          } absolute bg-orange-400 border border-gray-600 right-1/2 top-full shadow-2xl`}
        >
          <li
            className="p-1 hover:bg-orange-300 hover:cursor-pointer"
            onClick={() => {
              search({ order_price: 'DESC' });
              setHidden(false);
            }}
          >
            highest price
          </li>
          <li
            className="p-1 hover:bg-orange-300 hover:cursor-pointer"
            onClick={() => {
              search({ order_price: 'ASC' });
              setHidden(false);
            }}
          >
            lowest price
          </li>
          <li
            className="p-1 hover:bg-orange-300 hover:cursor-pointer"
            onClick={() => {
              search({ order_stock: 'DESC' });
              setHidden(false);
            }}
          >
            stock
          </li>
          <li className="p-1 hover:bg-orange-300 hover:cursor-pointer">
            Best sellers
          </li>
        </ul>
      </div>
    </div>
  );
};
