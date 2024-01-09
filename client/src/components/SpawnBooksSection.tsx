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
import NResultsForXCard from './NResultsForXCard';
export const SpawnBooksSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { booksLength, booksFiltered } = useBook();
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
      <NResultsForXCard booksLength={booksLength} />
      <div className="md:flex">
        <AsideFilter />

        <div className="md:hidden">
          <DDFiltersAndOrder />
          <FilterCard />
        </div>
        <section className="w-full">
          <Pagination
            totalCount={booksLength}
            limit={50}
            currentPage={currentPage}
            setCurrentPage={handleCurrentPage}
          />
          <div className="hidden md:block">
            <OrderMenu />{' '}
          </div>
          <div className="border m-1 text-center">
            <div className="grid p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {booksFiltered &&
                booksFiltered.map((book: Book) => <PreviewBook book={book} key={nanoid()} />)}
            </div>
            <Pagination
              totalCount={booksLength}
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
