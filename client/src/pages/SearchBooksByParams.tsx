import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import useBook from '../context/hooks/useBook';
import { SpawnBooksSection } from '../components/SpawnBooksSection';
import { fetchAndCache } from '../utils/fetchAndCache';
import { Category } from '../interfaces';
import { nanoid } from 'nanoid';
import { useSearchQuery } from '../hooks/useSearchQuery';

export interface CatBooks {
  cat: string;
  books: Array<any>;
} //SearchBooksByParams
export const SearchBooksByParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    fetchBooksBy,
    booksFiltered,
    setBooksFiltered,
    loading: searchLoading,
  } = useBook();
  const page = parseInt(searchParams.get('page') || '1');
  const cat = searchParams.get('category');
  const queryFormatFn = useSearchQuery();
  const loc = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    const cat = searchParams.get('category');
    if (cat) {
      const cacheName = `booksByCategory${cat}`;
      const query = queryFormatFn();
      console.log({ query });
      const url = `${import.meta.env.VITE_URL_BACK}/book/category${query}`;
      const fetch = async () => {
        const data = await fetchBooksBy(cacheName, url);
        setBooksFiltered(data);
        setLoading(false);
      };
      fetch();
    }
  }, []);

  useEffect(() => {
    let pagination = `&skip=${(page - 1) * 50}&limit=50`;

    const query = queryFormatFn();
    const cacheName = query;

    const url = `${
      import.meta.env.VITE_URL_BACK
    }/book/category${query}${pagination}`;
    const fetch = async () => {
      const data = await fetchBooksBy(cacheName, url);
      console.log({ data });
      setBooksFiltered(data);
    };
    fetch();
  }, [page, cat]);

  if (loading || searchLoading) return <Spinner />;
  return (
    <>
      <SpawnBooksSection
        books={booksFiltered.books[0]}
        count={booksFiltered.books[1]}
        text={booksFiltered.cat}
      />
    </>
  );
};
