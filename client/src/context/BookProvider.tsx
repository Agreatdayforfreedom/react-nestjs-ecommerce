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
    cat?: string;
  }) => void;
  loading: Loading;
  categories: Category[];
  params: URLSearchParams;
}

export const BookContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export const BookProvider = ({ children }: Props) => {
  const [params, setParams] = useSearchParams();

  const [loading, setLoading] = useState<Loading>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const search = async (query: {
    search?: string;
    max_price?: string;
    min_price?: string;
    order_price?: string;
    order_stock?: string;
    cat?: string;
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
    if (query.cat) {
      params.set('cat', query.cat);
      setParams(params);
    }
  };

  //categories
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
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
        categories,
        params,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
