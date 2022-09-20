import React from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import useBook from '../context/hooks/useBook';

export const AsideFilter = () => {
  const { search } = useBook();
  return (
    <div className="hidden md:block md:w-1/4 lg:w-1/6 lg mx-2">
      <aside className="relative border w-full h-96 border-slate-400 ">
        <h2 className="absolute w-1/2 -top-4 right-1/4 text-orange-600 text-center text-xl bg-white ">
          Filter By
        </h2>

        <h3 className="mt-3 bg-orange-100 text-center font-bold">Price</h3>
        <ul className="px-2">
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '1', max_price: '10' });
            }}
          >
            <IoMdArrowDropright size="17" />
            $1 ~ $10
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '10', max_price: '20' });
            }}
          >
            <IoMdArrowDropright size="17" />
            $10 ~ $20
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '20', max_price: '50' });
            }}
          >
            <IoMdArrowDropright size="17" />
            $20 ~ $50
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '50', max_price: '100' });
            }}
          >
            <IoMdArrowDropright size="17" />
            $50 ~ $100
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '100', max_price: '10000' });
            }}
          >
            <IoMdArrowDropright size="17" />
            more than $100
          </li>
        </ul>
      </aside>
    </div>
  );
};
