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
import { CatBooks } from '../pages/SearchBooksByParams';
import useQueryParams from '../hooks/useQueryParams';
import { constants } from '../constants';
import apiAxios from '../utils/apiAxios';
interface Props {
  children: ReactNode;
}
export interface BookContextProps {
  search: (query?: {
    search?: string;
    maxPrice?: string;
    minPrice?: string;
    order?: string;
    cat?: string;
  }) => void;
  loading: Loading;
  // params: URLSearchParams;
  // setParams: (
  //   nextInit: URLSearchParamsInit,
  //   navigateOptions?:
  //     | {
  //         replace?: boolean | undefined;
  //         state?: any;
  //       }
  //     | undefined
  // ) => void;
  booksLength: number;
  toggleActions: (val: keyof OpenOrCloseDropDownMenus) => void;
  hidden: OpenOrCloseDropDownMenus;
  setCatId: (state: Array<{ cid: number; name: string }>) => void;
  catId: Array<{ cid: number; name: string }>;
  handleSubmit: (book: FormGen) => void;
  fetchBooksBy: (url: string) => Promise<{ cat: string; books: Book[] }>;
  setFile: (state: any) => void;
  book: Book;
  priceFilter: any;
  getBook: (id: string) => void;
  deleteBook: (id: string) => void;
  getTop: (take: number) => void;
  bestSellers: Book[];
  booksFiltered: Book[];
  setBooksFiltered: (state: Book[]) => void;
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
  const [hidden, setHidden] = useState<OpenOrCloseDropDownMenus>({
    filterby: false,
    orderby: false,
    menunav: false,
  });
  const [loading, setLoading] = useState<Loading>(true);
  const [booksLength, setBooksLength] = useState<number>(0);
  const [bestSellers, setBestSellers] = useState<Book[]>([]);
  const [priceFilter, setPriceFilter] = useState<any>([]);
  const [booksFiltered, setBooksFiltered] = useState<Book[]>({} as Book[]);
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
      const url: string = `${constants.url}/book/${id}`;

      const { data } = await axios(url);
      setBook(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTop = async (take: number) => {
    try {
      const url: string = `${constants.url}/book/bestsellers?take=${take}`;
      const { data } = await axios(url);
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
      `${constants.url}/book`,
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
        `${constants.url}/book/upload/${data.id}`,
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
      `${constants.url}/book/${id}`,
      { ...rest, categories: catId.map((c) => c.cid) },
      config
    );
    navigate(`/book/${data.id}`);
    setLoading(false);
  };

  const deleteBook = async (id: string) => {
    await axios.delete(`${constants.url}/book/${id}`, config);
    navigate('/admin');
  };

  const [qp, _, __] = useQueryParams();

  const search = async () => {
    if (qp !== undefined) {
      const url = `${constants.url}/book/category${qp}`;
      console.log(url, 'URL');
      await fetchBooksBy(url);
    } else console.log('!! query format error');
  };
  const fetchBooksBy = async (
    url: string
  ): Promise<{ cat: string; books: Book[] }> => {
    const { data } = await apiAxios.get(url);
    console.log(url, 'UIRLL');
    setBooksLength(data.books[1]);
    setBooksFiltered(data.books[0]);
    if (data.filter.length > 0) {
      setPriceFilter(data.filter[0]);
    }

    return data;
  };

  return (
    <BookContext.Provider
      value={{
        search,
        loading,
        // params,
        // setParams,
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
