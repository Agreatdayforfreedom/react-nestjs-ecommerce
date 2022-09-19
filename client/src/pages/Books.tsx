import React, { useState } from 'react';
import { Loading } from '../components/Loading';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';

export const Books = () => {
  const [hidden, setHidden] = useState<any>({
    filter: false,
    order: false,
  });
  const { booksFiltered, search, loading } = useBook();

  const toggleActions = (selected: string) => {
    if (selected === 'filter') {
      return setHidden({ filter: !hidden.filter, order: false });
    }
    setHidden({ filter: false, order: !hidden.order });
  };

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col">
      <div className="h-full items-end">
        <ul className="flex mt-2">
          <li className="mx-2 p-1 px-4 bg-orange-400 font-bold text-white relative">
            <button onClick={() => toggleActions('filter')}>Filter by</button>
            <ul
              className={`${
                hidden.filter
                  ? 'block w-44 transition-all'
                  : 'hidden w-0 h-0 transition-all'
              } absolute bg-orange-400 left-1/2 top-full shadow-2xl`}
            >
              <li
                className="p-1 hover:bg-orange-300 hover:cursor-pointer"
                onClick={() => {
                  search({ min_price: '1', max_price: '10' });
                }}
              >
                $1 ~ $10
              </li>
              <li
                className="p-1 hover:bg-orange-200 hover:cursor-pointer"
                onClick={() => {
                  search({ min_price: '10', max_price: '20' });
                }}
              >
                $10 ~ $20
              </li>
              <li
                className="p-1 hover:bg-orange-300 hover:cursor-pointer"
                onClick={() => {
                  search({ min_price: '20', max_price: '50' });
                }}
              >
                $20 ~ $50
              </li>
              <li
                className="p-1 hover:bg-orange-300 hover:cursor-pointer"
                onClick={() => {
                  search({ min_price: '50', max_price: '100' });
                }}
              >
                $50 ~ $100
              </li>
              <li
                className="p-1 hover:bg-orange-300 hover:cursor-pointer"
                onClick={() => {
                  search({ min_price: '100', max_price: '10000' });
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
                hidden.order ? 'block' : 'hidden'
              } absolute bg-orange-400 w-full left-1/2 top-full shadow-2xl`}
            >
              <li
                onClick={() => {
                  search({ order_price: 'DESC' });
                }}
              >
                highest price
              </li>
              <li
                onClick={() => {
                  search({ order_price: 'ASC' });
                }}
              >
                lowest price
              </li>
              <li
                onClick={() => {
                  search({ order_stock: 'DESC' });
                }}
              >
                stock
              </li>
              <li>a</li>
              <li>a</li>
              <li>a</li>
            </ul>
          </li>
        </ul>
      </div>
      {booksFiltered[0] ? (
        booksFiltered.map((book) => <PreviewBook book={book} key={book.id} />)
      ) : (
        <div className="w-full text-center mt-10">
          <p className="font-bold text-red-600">Book not found</p>
        </div>
      )}
    </div>
  );
};
