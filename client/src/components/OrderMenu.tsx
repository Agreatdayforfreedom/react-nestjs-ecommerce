import React, { useEffect, useRef, useState } from 'react';
import useBook from '../context/hooks/useBook';
import { Order } from '../enums';

export const OrderMenu = () => {
  const [getNameOrder, setGetNameOrder] = useState<string>('Order by');

  const { search, toggleActions, hidden } = useBook();
  return (
    <div className="md:relative flex justify-end my-1 mx-3">
      <div className="mx-2 p-1 px-8 bg-slate-900 font-bold text-white">
        <button onClick={() => toggleActions('orderby')}>{getNameOrder}</button>
        <ul
          className={`${
            hidden.orderby
              ? 'block transition-all'
              : 'hidden w-0 h-0 transition-all'
          } absolute w-full z-50 bg-slate-900/95 border border-gray-600 left-0 top-full shadow-2xl text-slate-300`}
        >
          <header className="text-center text-orange-400 border border-orange-500">
            <h2 className="p-1">Order search</h2>
          </header>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              toggleActions('orderby');
              if (getNameOrder === 'Highest price') return;
              search({ order: Order.priceASC });

              setGetNameOrder('Highest price');
            }}
          >
            Highest price
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              toggleActions('orderby');
              if (getNameOrder === 'Lowest price') return;
              search({ order: Order.priceDESC });

              setGetNameOrder('Lowest price');
            }}
          >
            Lowest price
          </li>
          <li
            className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
            onClick={() => {
              toggleActions('orderby');
              if (getNameOrder === 'Stock') return;
              search({ order: Order.stock });
              setGetNameOrder('Stock');
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
