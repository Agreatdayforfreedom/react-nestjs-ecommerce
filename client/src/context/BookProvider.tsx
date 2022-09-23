import axios from 'axios';
import {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Book, Category, Loading } from '../interfaces';

interface Props {
  children: ReactNode;
}
export interface BookContextProps {
  search: (query: {
    search?: string;
    max_price?: string;
    min_price?: string;
    order?: string;
    cat?: string;
  }) => void;
  loading: Loading;
  categories: Category[];
  params: URLSearchParams;
  booksLength: Book[];
  getBooksLength: (p1: number | 'all', p2?: number) => number;
  toggleActions: (val: keyof OpenOrCloseDropDownMenus) => void;
  hidden: OpenOrCloseDropDownMenus;
}

export const BookContext = createContext<BookContextProps>(
  {} as BookContextProps
);

interface OpenOrCloseDropDownMenus {
  filterby: boolean;
  orderby: boolean;
  menunav: boolean;
}

export const BookProvider = ({ children }: Props) => {
  const [params, setParams] = useSearchParams();
  const [hidden, setHidden] = useState<OpenOrCloseDropDownMenus>({
    filterby: false,
    orderby: false,
    menunav: false,
  });
  const [loading, setLoading] = useState<Loading>(true);
  const [booksLength, setBooksLength] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleActions = (val: keyof OpenOrCloseDropDownMenus) => {
    setHidden({} as OpenOrCloseDropDownMenus);
    setHidden((prevValue) => ({ ...prevValue, [val]: !hidden[val] }));
  };

  const search = async (query: {
    search?: string;
    max_price?: string;
    min_price?: string;
    order?: string;
    cat?: string;
  }) => {
    //setting name/author in the query
    if (query.search) {
      setParams({ search: query.search });
    }
    if (query.max_price && query.min_price) {
      if (query.max_price === '0' && query.min_price === '0') {
        params.delete('minPrice');
        params.delete('maxPrice');
        return setParams(params);
      }
      params.set('minPrice', query.min_price);
      params.set('maxPrice', query.max_price);
      setParams(params);
    }
    if (query.order) {
      if (params.get('order')) {
        params.delete('order');
      }
      params.set('order', query.order);
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

  const id = params.get('cat');
  const searchParam = params.get('search');

  useEffect(() => {
    const getToGetLenght = async () => {
      try {
        setLoading(true);
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/book?search=${searchParam}`
        );
        setBooksLength(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    searchParam && getToGetLenght();
  }, [params]);

  useEffect(() => {
    const getByCat = async () => {
      try {
        setLoading(true);
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/categories/${id && id.at(-1)}`
        );
        setBooksLength(data.books);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    id && getByCat();
  }, [params]);

  const getBooksLength = (p1: number | 'all', p2?: number): number => {
    if (p1 === 'all') {
      p1 = 0;
      p2 = 10000;
    }
    const b: Array<Book> = booksLength.filter(
      (b: Book) => b.price >= p1 && b.price <= p2!
    );
    return b.length;
  };

  return (
    <BookContext.Provider
      value={{
        search,
        loading,
        categories,
        params,
        booksLength,
        getBooksLength,
        toggleActions,
        hidden,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
