import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import useBook from '../context/hooks/useBook';
import axios from 'axios';
import { Book, Loading as ILoading } from '../interfaces';
import { SpawnBooksSection } from '../components/SpawnBooksSection';

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<ILoading>(true);
  const loc = useLocation();

  const { params } = useBook();
  const getBooksWithFilter = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book${loc.search}`
      );
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooksWithFilter();
  }, [loc]);

  if (loading) return <Spinner />;
  return <SpawnBooksSection books={books} text={params.get('search')} />;
};
