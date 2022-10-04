import React, { useState } from 'react';
import useBook from '../context/hooks/useBook';
import { Book } from '../interfaces';
import { FilterMenu } from './FilterMenu';
import { Spinner } from './Spinner';
import { OrderMenu } from './OrderMenu';

export const DDFiltersAndOrder = () => {
  const [hidden, setHidden] = useState<{ filter: boolean; order: boolean }>({
    filter: false,
    order: false,
  });

  // const { search, loading, booksLength } = useBook();

  // const toggleActions = (selected: string) => {
  //   if (selected === 'filter') {
  //     return setHidden({ filter: !hidden.filter, order: false });
  //   }
  //   setHidden({ filter: false, order: !hidden.order });
  // };

  // if (loading && !booksLength) return <Spinner />;
  // const getBooksLength = (min: number, max: number) => {
  //   const b: Array<Book> = booksLength.filter(
  //     (b: Book) => b.price >= min && b.price <= max
  //   );
  //   return b.length;
  // };
  return (
    <div className="h-full items-end">
      <ul className="relative flex mt-2">
        <li>
          <FilterMenu />
        </li>
        <li>
          <OrderMenu />
        </li>
        {/* <li className="mx-2 p-1 px-8 bg-slate-900 font-bold text-white">
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
        </li> */}
      </ul>
    </div>
  );
};
