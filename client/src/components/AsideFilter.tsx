import React, { useEffect, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import useBook from '../context/hooks/useBook';
import { FilterCard } from './FilterCard';
import { useSearchParams } from 'react-router-dom';
import { Enum_TotalPriceFilter } from '../enums';

export const AsideFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, priceFilter, loading } = useBook();
  const minPrice: string | null = searchParams.get('minPrice');
  const maxPrice: string | null = searchParams.get('maxPrice');
  // if (loading) return <p>loading</p>;
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
              search({ minPrice: '0', maxPrice: '0' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              All{' '}
              <span>
                (
                {
                  priceFilter[
                    Enum_TotalPriceFilter[Enum_TotalPriceFilter['all']]
                  ]
                }
                )
              </span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ minPrice: '1', maxPrice: '10' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $1 ~ $10{' '}
              <span>
                (
                {
                  priceFilter[
                    Enum_TotalPriceFilter[Enum_TotalPriceFilter['1-10']]
                  ]
                }
                )
              </span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ minPrice: '11', maxPrice: '25' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $11 ~ $25{' '}
              <span>
                (
                {
                  priceFilter[
                    Enum_TotalPriceFilter[Enum_TotalPriceFilter['11-25']]
                  ]
                }
                )
              </span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ minPrice: '26', maxPrice: '50' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $26 ~ $50{' '}
              <span>
                (
                {
                  priceFilter[
                    Enum_TotalPriceFilter[Enum_TotalPriceFilter['26-50']]
                  ]
                }
                )
              </span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ minPrice: '51', maxPrice: '100' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              $51 ~ $100{' '}
              <span>
                (
                {
                  priceFilter[
                    Enum_TotalPriceFilter[Enum_TotalPriceFilter['51-100']]
                  ]
                }
                )
              </span>
            </p>
          </li>
          <li
            className="flex items-center text-sm text-slate-500 hover:text-slate-900 hover:cursor-pointer"
            onClick={() => {
              search({ minPrice: '101', maxPrice: '100000' });
            }}
          >
            <IoMdArrowDropright size="17" />
            <p>
              more than $100{' '}
              <span>
                (
                {
                  priceFilter[
                    Enum_TotalPriceFilter[Enum_TotalPriceFilter['101-100000']]
                  ]
                }
                )
              </span>
            </p>
          </li>
        </ul>
      </aside>
    </div>
  );
};
