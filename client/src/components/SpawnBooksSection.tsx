import React, { useEffect, useState } from 'react';
import { AsideFilter } from './AsideFilter';
import { DDFiltersAndOrder } from './DDFiltersAndOrder';
import { FilterCard } from './FilterCard';
import { OrderMenu } from './OrderMenu';
import { PreviewBook } from './PreviewBook';
import useBook from '../context/hooks/useBook';
import { Book } from '../interfaces';
import Pagination from './Pagination';
import { nanoid } from 'nanoid';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from './Spinner';
export const SpawnBooksSection = ({ books, count, text }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const page: number = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    handleCurrentPage(page);
    setLoading(false);
  }, [searchParams]); //get current page from params

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };
  if (loading) return <Spinner />;
  return (
    <div>
      <div className="bg-orange-200 border-y my-2 border-yellow-900 text-center p-2">
        <h2 className="text-black font-bold">
          <span className="text-orange-600">{count}</span> Results for{' '}
          <span className="text-orange-600">{text}</span>
        </h2>
      </div>
      <div className="md:flex">
        <AsideFilter />

        <div className="md:hidden">
          <DDFiltersAndOrder />
          <FilterCard />
        </div>
        <section className="w-full">
          <Pagination
            totalCount={count}
            limit={50}
            currentPage={currentPage}
            setCurrentPage={handleCurrentPage}
          />
          <div className="hidden md:block">
            <OrderMenu />
          </div>
          <div className="border m-1 text-center">
            <div className="grid p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {books &&
                books.map((book: Book) => (
                  <PreviewBook book={book} key={nanoid()} />
                ))}
            </div>
            <Pagination
              totalCount={count}
              limit={50}
              currentPage={currentPage}
              setCurrentPage={handleCurrentPage}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
