import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import useBook from '../context/hooks/useBook';
import { Book, Category } from '../interfaces';
import { FilterCard } from './FilterCard';
import { Spinner } from './Spinner';

export const AsideFilter = () => {
  const { search, booksLength, loading, getBooksLength } = useBook();

  if (loading && !booksLength) return <Spinner />;

  return (
    <div className="hidden md:block md:w-1/4 lg:w-1/5 lg mx-2">
      <FilterCard />
      <aside className="relative border w-full h-96 border-slate-400 mt-4">
        <h2 className="absolute w-3/4 -top-4 left-5 text-orange-600 text-center text-xl bg-white ">
          Filter By
        </h2>

        <h3 className="mt-3 bg-orange-100 text-center font-bold">Price</h3>
        <ul className="px-2">
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '0', max_price: '0' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              All <span>({getBooksLength(0, 1000)})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '1', max_price: '10' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $1 ~ $10 <span>({getBooksLength(1, 10)})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '10', max_price: '20' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $10 ~ $20 <span>({getBooksLength(10, 20)})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '20', max_price: '50' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $20 ~ $50 <span>({getBooksLength(20, 50)})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '50', max_price: '100' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $50 ~ $100 <span>({getBooksLength(50, 100)})</span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ min_price: '100', max_price: '10000' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              more than $100 <span>({getBooksLength(100, 10000)})</span>
            </p>
          </li>
        </ul>
      </aside>
    </div>
  );
};
