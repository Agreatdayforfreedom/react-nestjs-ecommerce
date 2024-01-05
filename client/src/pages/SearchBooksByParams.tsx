import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import useBook from '../context/hooks/useBook';
import { SpawnBooksSection } from '../components/SpawnBooksSection';
import { Category } from '../interfaces';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { constants } from '../constants';

export interface CatBooks {
  cat: string;
  books: Array<any>;
} //SearchBooksByParams

export const SearchBooksByParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { fetchBooksBy } = useBook();
  const page = parseInt(searchParams.get('page') || '1');
  const cat = searchParams.get('category');
  const queryFormatFn = useSearchQuery();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const query = queryFormatFn();
    let pagination = `&skip=${(page - 1) * 50}&limit=50`;

    const url = `/book/category${query}${pagination}`;
    const fetch = async () => {
      await fetchBooksBy(url);
      setLoading(false);
    };
    // TODO: TEST SEARCH BY PAGE , PAGINATION , AND FILTERS
    fetch();
  }, [page, cat]);

  if (loading) return <Spinner />;
  return (
    <>
      <SpawnBooksSection />
    </>
  );
};
