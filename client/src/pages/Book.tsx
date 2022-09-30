import { FormEvent, useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiPencilFill } from 'react-icons/ri';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Spinner } from '../components/Spinner';
import { Questions } from '../components/Questions';
import useAuth from '../context/hooks/useAuth';
import useBook from '../context/hooks/useBook';
import useCart from '../context/hooks/useCart';
import { Message, Metadata } from '../interfaces';

interface PropsMetadata {
  metadata: Metadata;
  bookId: number;
}

export const Book = () => {
  const { auth, loading: loadingAuth } = useAuth();
  const { addToCart, alert } = useCart();
  const [loading, setLoading] = useState(true);
  const { book, getBook, loading: loadingBook, deleteBook } = useBook();

  const params = useParams();

  useEffect(() => {
    setTimeout(() => {
      //spinner to make it look better on page load
      if (params && params.id) {
        getBook(params.id);
        setLoading(false);
      }
    }, 500);
  }, []);
  const handleDelete = () => {
    if (params.id) {
      deleteBook(params.id);
    }
  };

  const { message, err } = alert;
  if (loadingAuth || loadingBook || loading) return <Spinner />;
  return (
    <>
      <div className="flex flex-col md:border-b md:mx-2 lg:p-20 transition-all">
        {auth.id && (
          <div className="flex justify-end">
            <Link
              to={`/admin/update-book/${book.id}`}
              className="px-2 mx-2 mt-2 bg-orange-500 rounded text-white hover:bg-orange-700"
            >
              Update
            </Link>
            <button
              onClick={handleDelete}
              className="px-2 mx-2 mt-2 bg-red-500 rounded text-white hover:bg-red-900"
            >
              Remove
            </button>
          </div>
        )}
        <section className="md:flex">
          <div className="flex justify-center mt-3 p-1 border-b place-items-start border md:border-none">
            <img className="w-80 md:h-auto" src={book.image} alt={book.name} />
          </div>
          <div className="md:w-full">
            <div className="first:p-3 m-2 border-b-2 border-b-slate-400 md:flex md:flex-col">
              <h1 className="first:text-center text-3xl text-amber-800">
                {book.name}
              </h1>
              <p className="my-2">{book.author}</p>
              <p className="first-letter:uppercase mb-5 px-2 text-slate-700">
                {book.review}
              </p>
              <div className="flex">
                <p className="font-bold">Catalogs:</p>
                {book.categories &&
                  book.categories.map((c) => (
                    <div className="flex" key={c.id}>
                      <Link
                        to={`/categories?cat=${c.name}${c.id}`}
                        className="px-1 hover:underline"
                      >
                        {c.name},
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            <div className="m-2 border-b border-b-slate-400 pb-2">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-orange-600 px-3">
                  ${book.price}
                </h2>
                {message && err ? (
                  <p className="text-red-600">{message}, check your cart</p>
                ) : book.stock > 0 ? (
                  <div>
                    <p className="text-green-600">There is stock!</p>
                    <p>
                      Stock:{' '}
                      <span className="font-bold text-slate-700">
                        {book.stock}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="font-bold text-red-700">Without stock</p>
                )}
              </div>
              <button
                onClick={() => addToCart(book.id)}
                className="bg-blue-600 text-white p-2 rounded-sm border border-blue-900"
              >
                Add to cart
              </button>
              {message && !err && (
                <p className="font-bold text-xl text-green-700">{message}</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <MetadataBook metadata={book.metadata!} bookId={book.id && book.id} />
      <Questions bookId={book.id && book.id} />
    </>
  );
};

const MetadataBook = ({ metadata, bookId }: PropsMetadata) => {
  const [menuAdminMetadata, setMenuAdminMetadata] = useState(false);
  const { auth, loading: loadingAuth } = useAuth();
  const { deleteMetadata, loading: loadingBook } = useBook();

  const openMenuMetadata = () => {
    setMenuAdminMetadata(!menuAdminMetadata);
  };

  const handleDelete = () => {
    if (metadata.id) {
      deleteMetadata(metadata.id);
    }
  };
  if (loadingAuth || loadingBook) return <Spinner />;
  if (metadata && metadata.pages) {
    return (
      <section className="mx-2">
        <div className="flex justify-between items-center mx-2">
          <h2 className="text-xl">Details</h2>
          {auth.id && (
            <div className="relative">
              <button onClick={openMenuMetadata}>
                <RiArrowLeftSLine
                  size={25}
                  className={
                    menuAdminMetadata
                      ? '-rotate-90 transition-all hover:cursor-pointer'
                      : 'transition-all hover:cursor-pointer'
                  }
                />
              </button>

              <div
                className={
                  menuAdminMetadata
                    ? 'absolute block bg-slate-700 border-black rounded py-1 px-2 -bottom-12 -left-20'
                    : 'hidden'
                }
              >
                <Link
                  to={`/admin/update-metadata/${metadata.id}`}
                  className="text-white hover:text-orange-500"
                >
                  Update
                </Link>
                <button
                  onClick={handleDelete}
                  className="text-white hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
        <table className="flex border border-orange-400  bg-orange-200 ">
          <thead>
            <tr className="flex flex-col justify-between">
              <th className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                Pages
              </th>
              <th className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                Publisher
              </th>
              <th className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                Language
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="flex flex-col ">
              <td className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                {metadata.pages}
              </td>
              <td className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                {metadata.publisher}
              </td>
              <td className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                {metadata.language}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  } else if (!metadata && auth.id) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-blue-900 font-bold px-2">There is no metadata yet</p>
        <Link
          to={`/admin/add-metadata/${bookId}`}
          className="px-2 mx-2 mt-2 bg-orange-500 rounded text-white hover:bg-orange-700"
        >
          Add Metadata
        </Link>
      </div>
    );
  } else {
    return (
      <p className="text-blue-900 font-bold px-2">There is no metadata yet</p>
    );
  }
};
