import axios, { AxiosError } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Alert, Loading, Message } from '../interfaces';
import { configAxios } from '../utils/configAxios';

interface Props {
  children: ReactNode;
}

export interface QuestionContextProps {
  messageEditMode: Message;
  messages: Message[];
  ownMessages: Message[];
  getMessages: (bookId: number) => void;
  getOwnMessages: (bookId: number) => void;
  handleSubmitMessage: (message: Message, bookId?: number) => void;
  catchMessageToEdit: (message: Message) => void;
  deleteMessage: (messageId: number) => void;
  alert: Alert;
  loading: Loading;
}

export const QuestionsContext = createContext<QuestionContextProps>(
  {} as QuestionContextProps
);

export const QuestionsProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ownMessages, setOwnMessages] = useState<Message[]>([]);
  const [messageEditMode, setMessageEditMode] = useState<Message>(
    {} as Message
  );
  const [loading, setLoading] = useState<Loading>(true);
  const [alert, setAlert] = useState<Alert>({} as Alert);

  const token = localStorage.getItem('token');
  if (!token) return <p>loading</p>;

  const config = configAxios(token);

  const [params, setParams] = useSearchParams();

  const getMessages = async (bookId: number) => {
    const limitAll = params.get('limitAll');
    if (bookId && limitAll) {
      setLoading(true);
      const { data } = await axios(
        `${
          import.meta.env.VITE_URL_BACK
        }/messages/${bookId}?limitAll=${limitAll}`
      );
      setMessages(data);
      setLoading(false);
    }
  };

  //own questions
  const getOwnMessages = async (bookId: number) => {
    const limitOwn = params.get('limitOwn');
    if (bookId && limitOwn) {
      setLoading(true);
      const { data } = await axios(
        `${
          import.meta.env.VITE_URL_BACK
        }/messages/own/${bookId}?limitOwn=${limitOwn}`,
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
      setAlert({ message: 'Question sent successfully ', err: false });
      setTimeout(() => {
        setAlert({
          message: '',
          err: false,
        });
      }, 4000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setAlert({ message: error.response?.data.message, err: true });
        setTimeout(() => {
          setAlert({
            message: '',
            err: false,
          });
        }, 4000);
      }
    }
  };

  //EDIT
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
  //DELETE
  const deleteMessage = async (messageId: number) => {
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

  return (
    <QuestionsContext.Provider
      value={{
        messageEditMode,
        messages,
        ownMessages,
        getMessages,
        getOwnMessages,
        handleSubmitMessage,
        catchMessageToEdit,
        deleteMessage,
        alert,
        loading,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
