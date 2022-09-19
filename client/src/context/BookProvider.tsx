import axios from 'axios';
import { query } from 'express';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Book, Loading } from '../interfaces';

interface Props {
  children: ReactNode;
}
export interface BookContextProps {
  search: (query: {
    search?: string;
    max_price?: string;
    min_price?: string;
    order_price?: string;
    order_stock?: string;
  }) => void;
  booksFiltered: Book[];
  loading: Loading;
}

export const BookContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export const BookProvider = ({ children }: Props) => {
  const [query, setQuery] = useState<string>('');
  const [booksFiltered, setBooksFiltered] = useState<Book[]>([]);
  const [loading, setLoading] = useState<Loading>(true);

  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/book${loc.search}`
        );
        console.log(data);
        setBooksFiltered(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, [loc]);

  //Dudes, this is a disaster
  const search = async (queryString: {
    search?: string;
    max_price?: string;
    min_price?: string;
    order_price?: string;
    order_stock?: string;
  }) => {
    console.log(queryString);

    //setting name/author in the query
    setQuery(`/books?search=${queryString.search}`);
    console.log('1', query);

    //if there is a price range
    if (queryString.max_price && queryString.min_price) {
      //if the range already exists in the query then remove it and add the new price range
      if (query.split('&').length > 1) {
        return setQuery(
          query.split('&')[0] +
            `&minPrice=${queryString.min_price}&maxPrice=${queryString.max_price}`
        );
      }
      setQuery(
        query +
          `&minPrice=${queryString.min_price}&maxPrice=${queryString.max_price}`
      );
    }
    if (queryString.order_price) {
      //the same way as in range price.
      if (query.split('&').length > 1) {
        return setQuery(
          query.split('&')[0] + `&order_price=${queryString.order_price}`
        );
      }
      setQuery(query + `&order_price=${queryString.order_price}`);
    }
    if (queryString.order_stock) {
      if (query.split('&').length > 1) {
        return setQuery(
          query.split('&')[0] + `&order_stock=${queryString.order_stock}`
        );
      }
      setQuery(query + `&order_stock=${queryString.order_stock}`);
    }
    console.log(query);
  };

  useEffect(() => {
    navigate(query);
  }, [query]);

  return (
    <BookContext.Provider
      value={{
        search,
        booksFiltered,
        loading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
