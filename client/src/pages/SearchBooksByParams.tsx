import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import useBook from '../context/hooks/useBook';
import { SpawnBooksSection } from '../components/SpawnBooksSection';
import { Category } from '../interfaces';
import useQueryParams from '../hooks/useQueryParams';
import { constants } from '../constants';

export interface CatBooks {
  cat: string;
  books: Array<any>;
} //SearchBooksByParams

export const SearchBooksByParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const { fetchBooksBy } = useBook();
  // const cat = searchParams.get('category');
  const [qp, _, __] = useQueryParams();

  useEffect(() => {
    const url = `/book/category${qp}`;
    const fetch = async () => {
      if (qp !== '?') {
        await fetchBooksBy(url);
        setLoading(false);
      }
    };
    fetch();
  }, [qp]);

  if (loading) return <Spinner />;
  return (
    <>
      <SpawnBooksSection />
    </>
  );
};
