import React, { useEffect, useState } from 'react';
import { AsideFilter } from './AsideFilter';
import { DDFiltersAndOrder } from './DDFiltersAndOrder';
import { FilterCard } from './FilterCard';
import { OrderMenu } from './OrderMenu';
import { PreviewBook } from './PreviewBook';
import useBook from '../context/hooks/useBook';
import { Book } from '../interfaces';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';

export const SpawnBooksSection = ({ books, text }: any) => {
  const { getBooksLength } = useBook();

  return (
    <div>
      <div className="bg-orange-200 border-y my-2 border-yellow-900 text-center p-2">
        <h2 className="text-black font-bold">
          <span className="text-orange-600">{getBooksLength('all')}</span>{' '}
          Results for <span className="text-orange-600">{text}</span>
        </h2>
      </div>
      <div className="md:flex">
        <AsideFilter />
        <div className="md:hidden">
          <DDFiltersAndOrder />
          <FilterCard />
        </div>
        <section className="w-full">
          <div className="hidden md:block">
            <OrderMenu />
          </div>
          <div className="grid border p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {books &&
              books.map((book: Book) => (
                <PreviewBook book={book} key={book.id} />
              ))}
          <Pagination
        totalCount={getBooksLength('all')}
        limit={5}
      />
          </div>
        </section>
      </div>
    </div>
  );
};
