import axios, { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  URLSearchParamsInit,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { FormGen } from '../components/FormBook';
import {
  Alert,
  Book,
  Category,
  Loading,
  Message,
  Metadata,
} from '../interfaces';
import { configAxios } from '../utils/configAxios';
import { fetchAndCache } from '../utils/fetchAndCache';
import { CatBooks } from '../pages/Categories';
import { useSearchQuery } from '../hooks/useSearchQuery';

interface Props {
  children: ReactNode;
}
export interface BookContextProps {
  search: (query: {
    search?: string;
    maxPrice?: string;
    minPrice?: string;
    order?: string;
    cat?: string;
  }) => void;
  loading: Loading;
  params: URLSearchParams;
  setParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
  booksLength: Book[];
  toggleActions: (val: keyof OpenOrCloseDropDownMenus) => void;
  hidden: OpenOrCloseDropDownMenus;
  setCatId: (state: Array<{ cid: number; name: string }>) => void;
  catId: Array<{ cid: number; name: string }>;
  handleSubmit: (book: FormGen) => void;
  fetchBooksBy: (
    cacheName: string,
    url: string
  ) => Promise<{ cat: string; books: Book[] }>;
  setFile: (state: any) => void;
  book: Book;
  priceFilter: any;
  getBook: (id: string) => void;
  deleteBook: (id: string) => void;
  handleSubmitMetadata: (metadata: Metadata, id: string) => void;
  deleteMetadata: (id: string) => void;
  getTop: (take: number) => void;
  bestSellers: Book[];
  booksFiltered: CatBooks;
  setBooksFiltered: (state: CatBooks) => void;
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
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const [priceFilter, setPriceFilter] = useState<any>([]);
  const [booksFiltered, setBooksFiltered] = useState<CatBooks>({} as CatBooks);
  const [file, setFile] = useState<any>();
  const [catId, setCatId] = useState<Array<{ cid: number; name: string }>>([]);
  const [book, setBook] = useState<Book>({} as Book);

  const navigate = useNavigate();
  const location = useLocation();

  const config = configAxios();

  const toggleActions = (val: keyof OpenOrCloseDropDownMenus) => {
    setHidden({} as OpenOrCloseDropDownMenus);
    setHidden((prevValue) => ({ ...prevValue, [val]: !hidden[val] }));
  };

  //get book
  const getBook = async (id: string) => {
    try {
      setLoading(true);
      const cacheName: string = `books/book:${id}`;
      const url: string = `${import.meta.env.VITE_URL_BACK}/book/${id}`;
      const options: RequestInit = {
        headers: {
          'Cache-Control': `'max-age': ${1000 * 60 * 100}`,
        },
      };
      const data = await fetchAndCache<Book>(cacheName, url, options);
      setBook(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTop = async (take: number) => {
    try {
      const url: string = `${
        import.meta.env.VITE_URL_BACK
      }/book/bestsellers?take=${take}`;
      const cacheName: string = 'books:home:top';
      console.log(url, cacheName);
      const data = await fetchAndCache<Book[]>(cacheName, url);
      console.log({ data });
      setBestSellers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //send create book or udpate one
  const handleSubmit = (book: FormGen) => {
    if (book.id) {
      //update
      updateBook(book);
    } else {
      //create
      createBook(book);
    }
  };

  //create book
  const createBook = async (book: FormGen): Promise<void> => {
    setLoading(true);
    const { name, price, stock, author } = book;
    if ([name, price, stock, author].includes('')) return console.log('error');

    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/book`,
      { ...book, categories: catId.map((c) => c.cid) },
      config
    );

    if (data.response) {
      throw new Error('Error trying to create the book');
    }

    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      await axios.post(
        `${import.meta.env.VITE_URL_BACK}/book/upload/${data.id}`,
        formData,
        config
      );
    }
    navigate(`/admin/add-metadata/${data.id}`);
    setLoading(false);
  };

  const updateBook = async (book: FormGen) => {
    setLoading(true);
    const { id, ...rest } = book;
    const { data } = await axios.put(
      `${import.meta.env.VITE_URL_BACK}/book/${id}`,
      { ...rest, categories: catId.map((c) => c.cid) },
      config
    );
    navigate(`/book/${data.id}`);
    setLoading(false);
  };

  const deleteBook = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_URL_BACK}/book/${id}`, config);
    navigate('/admin');
  };

  const handleSubmitMetadata = (metadata: Metadata, id: string) => {
    if (metadata.id) {
      //update
      updateMetadata(metadata);
    } else {
      //create
      addMetadata(metadata, id);
    }
  };

  const addMetadata = async (metadata: Metadata, id: string) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/metadata`,
      { ...metadata, book: id },
      config
    );
    navigate(`/book/${data.book.id}`);
  };

  const updateMetadata = async (metadata: Metadata) => {
    const { id, ...rest } = metadata;

    await axios.put(
      `${import.meta.env.VITE_URL_BACK}/metadata/${id}`,
      rest,
      config
    );
    navigate(`/book/${metadata.book.id}`);
  };

  const deleteMetadata = async (id: string) => {
    await axios.delete(
      `${import.meta.env.VITE_URL_BACK}/metadata/${id}`,
      config
    );
  };
  const queryFormatFn = useSearchQuery();

  const search = async (query: {
    search?: string;
    maxPrice?: string;
    minPrice?: string;
    order?: string;
    cat?: string;
  }) => {
    //setting name/author in the query
    if (query.search) {
      setParams({ search: query.search });
    }
    if (query.maxPrice && query.minPrice) {
      if (query.maxPrice === '0' && query.minPrice === '0') {
        params.delete('minPrice');
        params.delete('maxPrice');
        return setParams(params);
      }
      params.set('minPrice', query.minPrice);
      params.set('maxPrice', query.maxPrice);
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

    if (location.search) {
      // console.log(params);
      setLoading(false);
      const res = queryFormatFn(query);
      console.log({ res });
      const cacheName = res;
      const url = `${import.meta.env.VITE_URL_BACK}/book/category${res}`;
      const data = await fetchBooksBy(cacheName, url);
      console.log({ data, url });
      setLoading(true);

      setBooksFiltered(data);
    }
    // console.log(location);
  };
  const fetchBooksBy = async (
    cacheName: string,
    url: string
  ): Promise<{ cat: string; books: Book[] }> => {
    setLoading(false);
    const data = await fetchAndCache(cacheName, url);
    setBooksLength(data.books[0]);
    if (data.filter[0]) {
      setPriceFilter(data.filter[0]);
    }

    setLoading(true);
    return data;
  };

  return (
    <BookContext.Provider
      value={{
        search,
        loading,
        params,
        setParams,
        booksLength,
        toggleActions,
        hidden,
        setCatId,
        catId,
        handleSubmit,
        priceFilter,
        setFile,
        book,
        getBook,
        fetchBooksBy,
        deleteBook,
        handleSubmitMetadata,
        deleteMetadata,
        bestSellers,
        getTop,
        booksFiltered,
        setBooksFiltered,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
