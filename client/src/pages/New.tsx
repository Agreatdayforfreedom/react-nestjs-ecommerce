import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';
import { Book, Loading as ILoading } from '../interfaces';

export const New = () => {
  const [hidden, setHidden] = useState(true);
  const [booksNews, setBooksNews] = useState<Book[]>([]);
  const [loading, setLoading] = useState<ILoading>(true);

  const { loading: loadingCat, categories, search } = useBook();

  const toggleActions = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/book?order=new`
        );
        setBooksNews(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  if (loading && loadingCat) return <Spinner />;
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:hidden mt-2">
        <div className="mx-2 p-1 px-4 bg-transparent border border-slate-700 rounded font-bold text-orange-600 relative">
          <button className="w-full" onClick={() => toggleActions()}>
            Search by categories
          </button>
          <ul
            className={`${
              hidden ? 'hidden' : 'block'
            } absolute z-50 bg-slate-900/95 border border-gray-600 left-0 top-full w-full shadow-2xl`}
          >
            {categories.map((c) => (
              <li
                className="w-full py-1 text-center hover:bg-slate-900/90"
                key={c.id}
              >
                <Link
                  to={`/categories?cat=${c.name}${c.id}`}
                  className="px-2 text-white b"
                >
                  {c.name}{' '}
                  <span className="text-slate-300">({c.books.length})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="relative hidden md:block w-1/4 h-96 border border-slate-500 mx-2">
        <h2 className="absolute w-4/5 m-auto -top-4 left-0 right-0 text-orange-600 text-center text-lg bg-white">
          Select Category
        </h2>
        <div className="flex flex-col mt-5">
          {categories.map((c) => (
            <div
              className="flex items-center text-slate-600 hover:text-black"
              key={c.id}
            >
              <IoMdArrowDropright size="17" />
              <Link
                className="pr-2 text-sm "
                to={`/categories?cat=${c.name}${c.id}`}
              >
                {c.name}{' '}
                <span className="text-slate-600">({c.books.length})</span>
              </Link>
            </div>
          ))}
        </div>
      </aside>

      <section className="p-1 w-full">
        <div className="grid border p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {booksNews[0] ? (
            booksNews.map((book) => <PreviewBook book={book} key={book.id} />)
          ) : (
            <div className="w-full text-center mt-10">
              <p className="font-bold text-red-600">Book not found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
