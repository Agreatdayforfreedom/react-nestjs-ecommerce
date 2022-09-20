import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Book, Category, Loading } from '../interfaces';
import { Order } from '../pages/Order';

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
  books: Book[];
  loading: Loading;
  categories: Category[];
}

export const BookContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export const BookProvider = ({ children }: Props) => {
  const [params, setParams] = useSearchParams();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<Loading>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const navigate = useNavigate();
  const loc = useLocation();

  // const getBooksByCategories = async () => {
  //   try {
  //     const { data } = await axios(
  //       `${import.meta.env.VITE_URL_BACK}/`
  //     );
  //     console.log('1', data);
  //     setBooks(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getBooksWithFilter = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book${loc.search}`
      );
      setBooks(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooksWithFilter();
  }, [loc]);

  useEffect(() => {
    if (!params.get('cat')) {
      if (loc.search) {
        console.log('change');
        console.log(params);
        navigate(`books${loc.search}`);
      }
    }
  }, [params]);

  //Dudes, this is a disaster
  const search = async (query: {
    search?: string;
    max_price?: string;
    min_price?: string;
    order_price?: string;
    order_stock?: string;
  }) => {
    //setting name/author in the query
    if (query.search) {
      setParams({ search: query.search });
    }
    if (query.max_price && query.min_price) {
      params.set('minPrice', query.min_price);
      params.set('maxPrice', query.max_price);
      setParams(params);
    }
    if (query.order_price) {
      if (params.get('order_stock')) {
        params.delete('order_stock');
      }
      params.set('order_price', query.order_price);
      setParams(params);
    }
    if (query.order_stock) {
      if (params.get('order_price')) {
        params.delete('order_price');
      }
      params.set('order_stock', query.order_stock);
      setParams(params);
    }
    // setQuery(`/books?search=${queryString.search}`);
    // console.log('1', query);
    // //if there is a price range
    // if (queryString.max_price && queryString.min_price) {
    //   //if the range already exists in the query then remove it and add the new price range
    //   if (query.split('&').length > 1) {
    //     return setQuery(
    //       query.split('&')[0] +
    //         `&minPrice=${queryString.min_price}&maxPrice=${queryString.max_price}`
    //     );
    //   }
    //   setQuery(
    //     query +
    //       `&minPrice=${queryString.min_price}&maxPrice=${queryString.max_price}`
    //   );
    // }
    // if (queryString.order_price) {
    //   //the same way as in range price.
    //   if (query.split('&').length > 1) {
    //     return setQuery(
    //       query.split('&')[0] + `&order_price=${queryString.order_price}`
    //     );
    //   }
    //   setQuery(query + `&order_price=${queryString.order_price}`);
    // }
    // if (queryString.order_stock) {
    //   if (query.split('&').length > 1) {
    //     return setQuery(
    //       query.split('&')[0] + `&order_stock=${queryString.order_stock}`
    //     );
    //   }
    //   setQuery(query + `&order_stock=${queryString.order_stock}`);
    // }
    // console.log(params.getAll('search'));
    // console.log('asd');
  };

  //categories
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/categories`
      );
      setCategories(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <BookContext.Provider
      value={{
        search,
        loading,
        books,
        categories,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
