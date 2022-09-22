import React, { useState } from 'react';
import useBook from '../context/hooks/useBook';

export const OrderMenu = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [getNameOrder, setGetNameOrder] = useState<string>('Order by');

  const { search } = useBook();

  const toggleActions = () => {
    setHidden(!hidden);
  };

  return (
    <div className="relative flex justify-end my-1 mx-3">
      <div className="hidden md:block mx-2 p-1 px-8 bg-slate-900 font-bold text-white">
        <button onClick={() => toggleActions()}>{getNameOrder}</button>
        <ul
          className={`${
            hidden ? 'block transition-all' : 'hidden w-0 h-0 transition-all'
          } absolute w-full z-50 bg-slate-900/95 border border-gray-600 left-0 top-full shadow-2xl text-slate-300`}
        >
          <header className="text-center text-orange-400 border border-orange-500">
            <h2 className="p-1">Order search</h2>
          </header>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ order_price: 'DESC' });
              setGetNameOrder('Highest price');
              setHidden(false);
            }}
          >
            Highest price
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ order_price: 'ASC' });
              setGetNameOrder('Lowest price');
              setHidden(false);
            }}
          >
            Lowest price
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              search({ order_stock: 'DESC' });
              setGetNameOrder('Stock');
              setHidden(false);
            }}
          >
            Stock
          </li>
          <li className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer">
            Best sellers
          </li>
        </ul>
      </div>
    </div>
  );
};
