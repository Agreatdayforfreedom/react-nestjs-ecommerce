import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';
import { Book, Loading as ILoading } from '../interfaces';

export const News = () => {
  const [hidden, setHidden] = useState(true);
  const [booksNews, setBooksNews] = useState<Book[]>([]);
  const [loading, setLoading] = useState<ILoading>(true);

  const { loading: loadingCat, categories, search, params } = useBook();
  const loc = useLocation();

  const toggleActions = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/book${loc.search}`
        );
        setBooksNews(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/book/category${loc.search}`
        );
        setBooksNews(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (loc.search.split('&').length > 1) {
      getBooks();
    }
  }, [loc]);

  if (loading && loadingCat) return <Loading />;
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
            } absolute bg-slate-900/80 border border-gray-600 left-0 top-full w-full shadow-2xl`}
          >
            {categories.map((c) => (
              <li className="w-full py-1 text-center border-b hover:bg-slate-900/75">
                <button
                  onClick={() => search({ cat: `${c.name}${c.id}` })}
                  className="px-2 text-white border-orange-500 hover:border-b "
                >
                  {c.name}{' '}
                  <span className="text-slate-300">({c.books.length})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="hidden md:block w-1/4 border border-slate-500 mx-2">
        <h2 className="text-orange-600 text-center text-xl bg-orange-100 border-b">
          Select Category
        </h2>
        <div className="flex flex-col">
          {categories.map((c) => (
            <Link
              className="px-2 text-sm border-y border-orange-200 hover:bg-orange-100"
              to={`/categories?cat=${c.name}${c.id}`}
            >
              {c.name}{' '}
              <span className="text-slate-600">({c.books.length})</span>
            </Link>
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
