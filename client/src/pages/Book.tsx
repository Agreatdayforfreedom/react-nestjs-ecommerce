import React, { FormEvent, useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiPencilFill } from 'react-icons/ri';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Spinner } from '../components/Spinner';
import { Questions } from '../components/Questions';
import useAuth from '../context/hooks/useAuth';
import useBook from '../context/hooks/useBook';
import useCart from '../context/hooks/useCart';
import { Alert, Book as IBook, Metadata } from '../interfaces';
import { Slider } from '../components/Slider';
import axios from 'axios';
import { Role_Enum } from '../enums';

interface PropsMetadata {
  metadata: any;
  bookId: number;
}

export const Book = () => {
  const [booksSlider, setBooksSlider] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const { book, getBook, loading: loadingBook, deleteBook } = useBook();

  const { auth, loading: loadingAuth } = useAuth();
  const { addToCart, alert, setAlert } = useCart();

  const params = useParams();

  const getBooksSlider = async () => {
    const { data } = await axios(`${import.meta.env.VITE_URL_BACK}/book`);
    setBooksSlider(data);
  };
  useEffect(() => {
    setAlert({} as Alert);
    setLoading(true);
    if (params && params.id) {
      getBook(params.id);
      getBooksSlider();
      setLoading(false);
    }
  }, [params]);
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
        {auth.id && auth.role === Role_Enum.ADMIN && (
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
                  <p className="text-red-600">Login to add to cart </p>
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

      <MetadataBook
        metadata={{ format: book.format, isbn: book.isbn, stars: book.stars }}
        bookId={book.id && book.id}
      />
      <Questions bookId={book.id && book.id} />
      {/* <Slider books={booksSlider} title="you migth be interested" /> */}
    </>
  );
};

const MetadataBook = ({ metadata, bookId }: PropsMetadata) => {
  const { auth, loading: loadingAuth } = useAuth();
  const { loading: loadingBook } = useBook();

  if (loadingAuth || loadingBook) return <Spinner />;
  if (metadata) {
    return (
      <section className="mx-2">
        <div className="flex justify-between items-center mx-2">
          <h2 className="text-xl">Details</h2>
        </div>
        <table className="flex border border-orange-400  bg-orange-200 ">
          <thead>
            <tr className="flex flex-col justify-between">
              <th className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                Isbn
              </th>
              <th className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                Format
              </th>
              <th className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                Stars
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="flex flex-col ">
              <td className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                {metadata.isbn}
              </td>
              <td className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                {metadata.format}
              </td>
              <td className="border-r border-r-orange-400 border-b border-b-orange-400 px-2 py-1">
                {metadata.stars}
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
