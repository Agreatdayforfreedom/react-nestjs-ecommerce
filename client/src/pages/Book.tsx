import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiPencilFill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Spinner } from '../components/Loading';
import useAuth from '../context/hooks/useAuth';
import useBook from '../context/hooks/useBook';
import useCart from '../context/hooks/useCart';
import { useForm } from '../hooks/useForm';
import { Message, Metadata } from '../interfaces';
import { Alert } from '../components/Alert';

interface PropsMetadata {
  metadata: Metadata;
  bookId: number;
}

interface PropsMessages {
  bookId: number;
}

interface PropsMessagesForm {
  bookId: number;
  messages: Message[];
}

interface PropsMessageCard {
  message: Message;
  own?: boolean;
}

interface PropsOwnMessageCard {
  ownMessages: Message;
}

// export interface MessageForm {
//   id?: number;
//   message: string;
// }

export const Book = () => {
  const { auth, loading: loadingAuth } = useAuth();
  const { addToCart, alert } = useCart();
  const { book, getBook, loading: loadingBook, deleteBook } = useBook();

  const params = useParams();

  useEffect(() => {
    if (params && params.id) {
      getBook(params.id);
    }
  }, []);

  const handleDelete = () => {
    if (params.id) {
      deleteBook(params.id);
    }
  };

  const { message, err } = alert;
  if (loadingAuth || loadingBook) return <Spinner />;
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
  useEffect(() => {
    console.log('dwo');
  }, []);
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

const Questions = ({ bookId }: PropsMessages) => {
  const [limitAll, setLimitAll] = useState<string>('4');
  const [limitOwn, seLimitOwn] = useState<string>('2');
  const [params, setParams] = useSearchParams();
  const [alertNoReviews, setAlertNoReviews] = useState<{
    all: string;
    own: string;
  }>({
    all: '',
    own: '',
  });

  const { getMessages, messages, ownMessages, getOwnMessages, loading } =
    useBook();
  useEffect(() => {
    params.set('limitAll', limitAll);
    params.set('limitOwn', limitOwn);
    setParams(params);
    console.log(params);
    if (bookId) {
      getMessages(bookId);
      getOwnMessages(bookId);
    }
  }, [limitAll, limitOwn]);

  const appendLimit = (limit: 'all' | 'own') => {
    const limitAllCheck = params.get('limitAll');
    const limitOwnCheck = params.get('limitOwn');
    const a = parseInt(limitAll, 10) + 4;
    const b = parseInt(limitOwn, 10) + 2;
    if (limit === 'all') {
      if (limitAllCheck && parseInt(limitAllCheck) > messages.length) {
        return setAlertNoReviews({ all: 'No more reviews', own: '' });
      }
      setLimitAll(a.toString());
      params.set('limitAll', a.toString());
    }
    if (limit === 'own') {
      if (limitOwnCheck && parseInt(limitOwnCheck) > messages.length) {
        return setAlertNoReviews({ all: '', own: 'No more reviews' });
      }
      seLimitOwn(b.toString());
      params.set('limitOwn', b.toString());
    }
    setParams(params);
  };

  if (loading) return <Spinner />;
  return (
    <div className="mx-2 mt-10 border-t-2 border-t-gray-500 pt-5">
      <div className="border p-3">
        <h3 className="border-b py-1 font-bold text-slate-600">
          Questions: <span>{messages && messages.length}</span>
        </h3>
        {messages &&
          messages.map((m) => <MessageCard message={m} key={m.id} />)}
        <div className="text-end">
          <button
            className={
              messages.length === 0
                ? 'hidden'
                : 'text-sm text-orange-600 hover:underline'
            }
            onClick={() => appendLimit('all')}
          >
            Show more
          </button>
          {alertNoReviews.all && (
            <p className="text-sm text-red-500">{alertNoReviews.all}</p>
          )}
        </div>
      </div>
      <FormMessage bookId={bookId} messages={messages} />
      <div>
        <h3 className="border-b py-1 font-bold text-slate-600">
          Your Quesions
        </h3>
        {ownMessages &&
          ownMessages.map((m: any) => (
            <OwnMessageCard ownMessages={m} key={m.id} />
          ))}
        <button
          className={
            messages.length === 0
              ? 'hidden'
              : 'text-sm text-orange-600 hover:underline'
          }
          onClick={() => appendLimit('own')}
        >
          Show more
        </button>
        {alertNoReviews.own && (
          <p className="text-sm text-red-500">{alertNoReviews.own}</p>
        )}
      </div>
    </div>
  );
};

const FormMessage = ({ bookId }: PropsMessagesForm) => {
  const { handleChange, form, setForm } = useForm<Message>();
  const { handleSubmitMessage, messageEditMode, catchMessageToEdit, alert } =
    useBook();

  useEffect(() => {
    if (messageEditMode.message) {
      setForm(messageEditMode);
    }
  }, [messageEditMode]);
  // receiving the messaje object and setting in the textarea value if it exists

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleSubmitMessage(form, bookId);
    setForm({ message: '' });
  };

  const { message } = alert;
  console.log(alert);
  return (
    <section>
      <form
        className={
          messageEditMode.message
            ? 'mt-2 p-1 bg-orange-400/20 rounded'
            : 'mt-2 p-1'
        }
        onSubmit={handleSubmit}
      >
        <textarea
          name="message"
          id="message"
          className={
            messageEditMode.message
              ? 'border-2 border-orange-500 p-2 focus-within:outline-none w-full'
              : 'border border-orange-500 p-2 focus-within:outline-none w-full'
          }
          value={form.message && form.message}
          placeholder="Your review here"
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-between">
          {message ? (
            <Alert alert={alert} />
          ) : (
            <p className="text-slate-600 text-sm font-bold">
              You just can send 3 questions
            </p>
          )}
          <div>
            {messageEditMode.message && (
              <button
                type="button"
                className="rounded bg-gray-800 p-2 font-bold text-white hover:bg-gray-900 transition-all"
                onClick={() => {
                  catchMessageToEdit({ message: '' }), setForm({ message: '' });
                }}
              >
                Cancel
              </button>
            )}

            <Button bName={messageEditMode.message ? 'Save' : 'Send'} />
          </div>
        </div>
      </form>
    </section>
  );
};

const OwnMessageCard = ({ ownMessages }: PropsOwnMessageCard) => {
  return <MessageCard message={ownMessages} own={true} />;
};

const MessageCard = ({ message, own }: PropsMessageCard) => {
  const [showCompleteQuestion, setShowCompleteQuestion] = useState(false);
  const { auth, loading } = useAuth();
  const { catchMessageToEdit, handleDelete } = useBook();

  const handleUpdate = async (message: any) => {
    catchMessageToEdit(message);
  };

  const ShowCompleteQuestion = () => {
    setShowCompleteQuestion(!showCompleteQuestion);
    console.log(showCompleteQuestion);
  };

  if (loading) return <Spinner />;
  return (
    <div className="flex justify-between p-2 border-b">
      <div className="w-4/5">
        <p className="flex text-slate-800 font-bold">
          {own && message.user && auth.id == message.user.id
            ? 'You'
            : message.user && message.user.username}
          :
        </p>
        <p
          className={`${
            showCompleteQuestion
              ? 'overflow-visible break-words'
              : 'overflow-hidden'
          } pl-3 text-sm text-slate-800 w-96 `}
        >
          {message.message}
          {message.message.length > 53 && (
            <span>
              <button
                className="text-xs pl-2 text-slate-600 hover:underline"
                onClick={ShowCompleteQuestion}
              >
                {showCompleteQuestion ? 'Hide...' : 'Read More...'}
              </button>
            </span>
          )}
        </p>
      </div>
      {own && message.user && auth.id == message.user.id && (
        <div>
          <button onClick={() => handleUpdate(message)}>
            <RiPencilFill
              size={20}
              className="text-orange-700 hover:text-orange-900"
            />
          </button>
          <button onClick={() => handleDelete(message.id!)}>
            <AiFillDelete
              size={20}
              className="text-red-700 hover:text-red-900"
            />
          </button>
        </div>
      )}
    </div>
  );
};
