import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Message } from '../interfaces';
import { Alert } from './Alert';
import { Button } from './Button';
import { AiFillDelete } from 'react-icons/ai';
import { Spinner } from './Spinner';
import useAuth from '../context/hooks/useAuth';
import { RiPencilFill } from 'react-icons/ri';
import useQuestions from '../context/hooks/useQuestions';

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

export const Questions = ({ bookId }: PropsMessages) => {
  const [limitAll, setLimitAll] = useState<string>('4');
  const [limitOwn, setLimitOwn] = useState<string>('2');
  const [params, setParams] = useSearchParams();
  const [alertNoReviews, setAlertNoReviews] = useState<{
    all: string;
    own: string;
  }>({
    all: '',
    own: '',
  });

  const {
    getMessages,
    messages,
    ownMessages,
    messagesLength,
    getOwnMessages,
    getMessagesLength,
    loading,
  } = useQuestions();

  useEffect(() => {
    if (bookId) {
      getMessages(bookId);
      getOwnMessages(bookId);
      getMessagesLength(bookId);
    }
  }, [limitAll, limitOwn]);

  const appendLimit = (limit: 'all' | 'own') => {
    const limitAllCheck = params.get('limitAll');
    const limitOwnCheck = params.get('limitOwn');
    const a = parseInt(limitAll, 10) + 4;
    const b = parseInt(limitOwn, 10) + 2;
    if (limit === 'all') {
      if (limitAllCheck && parseInt(limitAllCheck) > messages.length) {
        return setAlertNoReviews({ all: 'No more questions', own: '' });
      }
      setLimitAll(a.toString());
      params.set('limitAll', a.toString());
    }
    if (limit === 'own') {
      if (limitOwnCheck && parseInt(limitOwnCheck) > messages.length) {
        return setAlertNoReviews({ all: '', own: 'No more questions' });
      }
      setLimitOwn(b.toString());
      params.set('limitOwn', b.toString());
    }
    setParams(params);
  };

  if (loading) return <Spinner />;
  return (
    <div className="mx-2 mt-10 border-t-2 border-t-gray-500 pt-5">
      <div className="border p-3">
        <h3 className="border-b py-1 font-bold text-slate-600">
          Questions: <span>{messagesLength && messagesLength}</span>
        </h3>
        {messages &&
          messages.map((m: Message) => <MessageCard message={m} key={m.id} />)}
        <div className="text-end">
          <button
            className={
              messagesLength === 0
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
          ownMessages.map((m: Message) => (
            <OwnMessageCard ownMessages={m} key={m.id} />
          ))}
        <button
          className={
            messagesLength === 0
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
    useQuestions();

  useEffect(() => {
    catchMessageToEdit({ message: '' }), setForm({ message: '' });
  }, []);

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

  return (
    <section>
      <form
        className={
          messageEditMode.message ? 'mt-2 p-1 bg-slate-700/80' : 'mt-2 p-1'
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
            <p
              className={`text-sm font-bold
                ${messageEditMode.message ? 'text-white' : 'text-slate-600'}`}
            >
              You just can send 3 questions
            </p>
          )}
          <div>
            {messageEditMode.message && (
              <button
                type="button"
                className="p-2 font-bold text-white"
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
  const { catchMessageToEdit, deleteMessage } = useQuestions();
  const handleUpdate = async (message: Message) => {
    catchMessageToEdit(message);
  };
  const ShowCompleteQuestion = () => {
    setShowCompleteQuestion(!showCompleteQuestion);
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
          <button onClick={() => deleteMessage(message.id!)}>
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
