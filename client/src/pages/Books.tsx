import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DDFiltersAndOrders } from '../components/DDFiltersAndOrders';
import { Loading } from '../components/Loading';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';
import { IoMdArrowDropright } from 'react-icons/io';

export const Books = () => {
  const [hidden, sethidden] = useState(false);
  const { books, search, loading, categories } = useBook();
  const toggleActions = (or: any) => {
    sethidden(!hidden);
  };
  if (loading) return <Loading />;
  return (
    <>
      <div className="flex justify-end my-1">
        <div className="hidden md:block mx-2 p-1 px-4 bg-orange-400 font-bold text-white relative">
          <button onClick={() => toggleActions('order')}>Order by</button>
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
              }}
            >
              highest price
            </li>
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ order_price: 'ASC' });
              }}
            >
              lowest price
            </li>
            <li
              className="p-1 hover:bg-orange-300 hover:cursor-pointer"
              onClick={() => {
                search({ order_stock: 'DESC' });
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
      <div className="flex flex-col md:flex-row">
        <div className="md:hidden">
          <DDFiltersAndOrders search={search} />
        </div>
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
        <section className="p-1 w-full">
          <div className="grid border p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books[0] ? (
              books.map((book) => <PreviewBook book={book} key={book.id} />)
            ) : (
              <div className="w-full text-center mt-10">
                <p className="font-bold text-red-600">Book not found</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
