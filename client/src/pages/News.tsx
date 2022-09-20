import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DDFiltersAndOrders } from '../components/DDFiltersAndOrders';
import { Loading } from '../components/Loading';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';
export const News = () => {
  const { books, loading, categories } = useBook();
  const [hidden, setHidden] = useState(true);
  const toggleActions = () => {
    setHidden(!hidden);
  };
  if (loading) return <Loading />;
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
                <Link
                  className="px-2 text-white border-orange-500 hover:border-b "
                  to={`/categories?${c.id}`}
                >
                  {c.name}{' '}
                  <span className="text-slate-300">({c.books.length})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="hidden md:block w-1/6 border border-slate-500 mx-2">
        <h2 className="text-orange-600 text-center text-xl bg-orange-100 border-b">
          Select Category
        </h2>
        <div className="flex flex-col">
          {categories.map((c) => (
            <Link
              className="px-2 text-sm border-y border-orange-200 hover:bg-orange-100"
              to={`/categories?${c.id}`}
            >
              {c.name}{' '}
              <span className="text-slate-600">({c.books.length})</span>
            </Link>
          ))}
        </div>
      </aside>

      <section className="p-1 w-full">
        <div className="grid border p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
          {books[0] ? (
            books.map((book) => <PreviewBook book={book} key={book.id} />)
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
