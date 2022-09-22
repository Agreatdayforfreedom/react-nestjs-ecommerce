import React, { useState } from 'react';
import useBook from '../context/hooks/useBook';

export const DDFiltersAndOrders = () => {
  const [hidden, setHidden] = useState<{ filter: boolean; order: boolean }>({
    filter: false,
    order: false,
  });

  const { search } = useBook();

  const toggleActions = (selected: string) => {
    if (selected === 'filter') {
      return setHidden({ filter: !hidden.filter, order: false });
    }
    setHidden({ filter: false, order: !hidden.order });
  };

  return (
    <div className="h-full items-end">
      <ul className="relative flex mt-2">
        <li className="mx-2 p-1 px-8 bg-slate-900 font-bold text-white">
          <button onClick={() => toggleActions('filter')}>Filter by</button>
          <ul
            className={`${
              hidden.filter ? 'block transition-all' : 'hidden transition-all'
            } absolute w-full z-50 bg-slate-900/95 border border-gray-600 left-0 top-full shadow-2xl text-slate-300`}
          >
            <header className="text-center text-orange-400 border border-orange-500">
              <h2 className="p-1">Filter search</h2>
            </header>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '0', max_price: '0' });
                setHidden({ filter: false, order: false });
              }}
            >
              All
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '1', max_price: '10' });
                setHidden({ filter: false, order: false });
              }}
            >
              $1 ~ $10
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '10', max_price: '20' });
                setHidden({ filter: false, order: false });
              }}
            >
              $10 ~ $20
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '20', max_price: '50' });
                setHidden({ filter: false, order: false });
              }}
            >
              $20 ~ $50
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '50', max_price: '100' });
                setHidden({ filter: false, order: false });
              }}
            >
              $50 ~ $100
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '100', max_price: '10000' });
                setHidden({ filter: false, order: false });
              }}
            >
              more than $100
            </li>
          </ul>
        </li>
        <li className="mx-2 p-1 px-8 bg-slate-900 font-bold text-white">
          <button onClick={() => toggleActions('order')}>Order by</button>
          <ul
            className={`${
              hidden.order
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
                search({ order_price: 'DESC' });
                setHidden({ filter: false, order: false });
              }}
            >
              Highest price
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ order_price: 'ASC' });
                setHidden({ filter: false, order: false });
              }}
            >
              Lowest price
            </li>
            <li
              className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer"
              onClick={() => {
                search({ order_stock: 'DESC' });
                setHidden({ filter: false, order: false });
              }}
            >
              Stock
            </li>
            <li className="p-2 hover:bg-slate-900/80 border-b border-slate-400 hover:cursor-pointer">
              Best sellers
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
