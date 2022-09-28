import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  URLSearchParamsInit,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { FormGen } from '../components/FormBook';
import { Book, Category, Loading, Message, Metadata } from '../interfaces';
import { configAxios } from '../utils/configAxios';

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
  getBooksLength: (p1: number | 'all', p2?: number) => number;
  toggleActions: (val: keyof OpenOrCloseDropDownMenus) => void;
  hidden: OpenOrCloseDropDownMenus;
  setCatId: (state: number[]) => void;
  catId: number[];
  handleSubmit: (book: FormGen) => void;
  setFile: (state: any) => void;
  book: Book;
  getBook: (id: string) => void;
  deleteBook: (id: string) => void;
  handleSubmitMetadata: (metadata: Metadata, id: string) => void;
  deleteMetadata: (id: string) => void;
  messageEditMode: Message;
  messages: Message[];
  ownMessages: Message[];
  getMessages: (bookId: number) => void;
  getOwnMessages: (bookId: number) => void;
  handleSubmitMessage: (message: Message, bookId?: number) => void;
  catchMessageToEdit: (message: Message) => void;
  handleDelete: (messageId: number) => void;
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
  const [file, setFile] = useState<any>();
  const [catId, setCatId] = useState<number[]>([]);
  const [book, setBook] = useState<Book>({} as Book);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ownMessages, setOwnMessages] = useState<Message[]>([]);

  const [messageEditMode, setMessageEditMode] = useState<Message>(
    {} as Message
  );

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) return <p>loading</p>;

  const config = configAxios(token);

  const toggleActions = (val: keyof OpenOrCloseDropDownMenus) => {
    setHidden({} as OpenOrCloseDropDownMenus);
    setHidden((prevValue) => ({ ...prevValue, [val]: !hidden[val] }));
  };

  //get book
  const getBook = async (id: string) => {
    setLoading(true);
    const { data } = await axios(`${import.meta.env.VITE_URL_BACK}/book/${id}`);
    setBook(data);
    setLoading(false);
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
    const { name, price, stock, author } = book;
    if ([name, price, stock, author].includes('')) return console.log('error');

    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/book`,
      { ...book, categories: catId },
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
  };

  const updateBook = async (book: FormGen) => {
    const { id, ...rest } = book;
    const { data } = await axios.put(
      `${import.meta.env.VITE_URL_BACK}/book/${id}`,
      { ...rest, categories: catId },
      config
    );
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

  /*
   *messages
   *questions
   */

  const getMessages = async (bookId: number) => {
    if (bookId) {
      // setLoading(true);
      console.log(params.get('limitAll'), 'dakw');
      const { data } = await axios(
        `${
          import.meta.env.VITE_URL_BACK
        }/messages/${bookId}?limitAll=${params.get('limitAll')}`
      );
      setMessages(data);
    }
  };

  //own questions
  const getOwnMessages = async (bookId: number) => {
    if (bookId) {
      const { data } = await axios(
        `${
          import.meta.env.VITE_URL_BACK
        }/messages/own/${bookId}?limitOwn=${params.get('limitOwn')}`,
        config
      );
      setOwnMessages(data);
      setLoading(false);
    }
  };

  const handleSubmitMessage = (message: Message, bookId?: number) => {
    if (message.id) {
      updateMessage(message);
    } else if (bookId) {
      createMessage(message, bookId);
    }
  };

  // to get the message object and send it to the form component
  const catchMessageToEdit = (message?: Message) => {
    //set the object in to state, then pass the state to the form
    if (message && message.message) {
      setMessageEditMode(message);
    } else {
      setMessageEditMode({ message: '' });
    }
  };
  // CREATE
  const createMessage = async (message: Message, bookId: number) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/messages/${bookId}`,
        message,
        config
      );
      setMessages([...messages, data]);
      setOwnMessages([...ownMessages, data]);
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: EDIT
  const updateMessage = async (message: Message) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL_BACK}/messages/${message.id}`,
        message,
        config
      );
      setMessages(messages.map((m) => (m.id === data.id ? data : messages)));
      setOwnMessages(
        ownMessages.map((m) => (m.id === data.id ? data : ownMessages))
      );

      setMessageEditMode({ message: '' });
    } catch (error) {
      console.log(error);
    }
  };
  //TODO: DELETE
  const handleDelete = async (messageId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_URL_BACK}/messages/${messageId}`,
        config
      );
      setMessages(messages.filter((m) => m.id !== messageId));
      setOwnMessages(ownMessages.filter((m) => m.id !== messageId));
    } catch (error) {
      console.log(error);
    }
  };
  //TODO: SOME
  //TODO: MESSAGE

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

  const idCat = params.get('cat');
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
          `${import.meta.env.VITE_URL_BACK}/categories/${idCat && idCat.at(-1)}`
        );
        setBooksLength(data.books);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    idCat && getByCat();
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
        setParams,
        booksLength,
        getBooksLength,
        toggleActions,
        hidden,
        setCatId,
        catId,
        handleSubmit,
        setFile,
        book,
        getBook,
        deleteBook,
        handleSubmitMetadata,
        deleteMetadata,
        messageEditMode,
        getMessages,
        getOwnMessages,
        messages,
        ownMessages,
        handleSubmitMessage,
        catchMessageToEdit,
        handleDelete,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
