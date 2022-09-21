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
      <ul className="flex mt-2">
        <li className="mx-2 p-1 px-4 bg-orange-400 font-bold text-white relative">
          <button onClick={() => toggleActions('filter')}>Filter by</button>
          <ul
            className={`${
              hidden.filter
                ? 'block w-44 transition-all'
                : 'hidden w-0 h-0 transition-all'
            } absolute bg-orange-400 border border-gray-600 left-1/2 top-full shadow-2xl`}
          >
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '1', max_price: '10' });
                setHidden({ filter: false, order: false });
              }}
            >
              $1 ~ $10
            </li>
            <li
              className="p-1 hover:bg-orange-200 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '10', max_price: '20' });
                setHidden({ filter: false, order: false });
              }}
            >
              $10 ~ $20
            </li>
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '20', max_price: '50' });
                setHidden({ filter: false, order: false });
              }}
            >
              $20 ~ $50
            </li>
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '50', max_price: '100' });
                setHidden({ filter: false, order: false });
              }}
            >
              $50 ~ $100
            </li>
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ min_price: '100', max_price: '10000' });
                setHidden({ filter: false, order: false });
              }}
            >
              more than $100
            </li>
          </ul>
        </li>
        <li className="mx-2 p-1 px-4 bg-orange-400 font-bold text-white relative">
          <button onClick={() => toggleActions('order')}>Order by</button>
          <ul
            className={`${
              hidden.order
                ? 'block w-44 transition-all'
                : 'hidden w-0 h-0 transition-all'
            } absolute bg-orange-400 border border-gray-600 left-1/2 top-full shadow-2xl`}
          >
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ order_price: 'DESC' });
                setHidden({ filter: false, order: false });
              }}
            >
              highest price
            </li>
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ order_price: 'ASC' });
                setHidden({ filter: false, order: false });
              }}
            >
              lowest price
            </li>
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ order_stock: 'DESC' });
                setHidden({ filter: false, order: false });
              }}
            >
              stock
            </li>
            <li className="p-1 hover:bg-orange-300 hover:cursor-pointer">
              Best sellers
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
